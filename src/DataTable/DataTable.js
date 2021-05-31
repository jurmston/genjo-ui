  import * as React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import LinearProgress from '@material-ui/core/LinearProgress'

import getCellAlignment from './utils/getCellAlignment'
import getSortIcon from './utils/getSortIcon'

import useDebounce from '../useDebounce'

import CircleLoader from '../CircleLoader'
import { DragBoundry } from './DragBoundry'
import { DataWindow } from './DataWindow'
import { Header } from './Header'
import { Totals } from './Totals'

import './styles.css'
import { calculateWidths } from './utils/calculateWidths'
import { safeDivide } from '../utils/math'

import scrollbarSize from 'dom-helpers/scrollbarSize'

import { DataTableContext } from './DataTableContext'


const HEADER_HEIGHT = 48
const TOTALS_HEIGHT = 56
const HEIGHT_BUFFER = 7
const INNER_BORDER_WIDTH = 2


export const DataTable = ({
  actionsWidth = 0,
  columns: columnsFromProps = [],
  containerHeight = 0,
  containerWidth = 0,
  customRenderers,
  isFetching = false,
  isLoading = false,
  maxColumnWidth = 500,
  minColumnWidth = 50,
  onColumnResize,
  onItemsRendered,
  overscanCount = 30,
  renderActions,
  rowCount,
  rows = {},
  selected,
  selectionMode,
  selectMany,
  setSortBy,
  sortBy,
  toggleSelected,
  toggleSelectionMode,
  totals,
  unselectMany,
}) => {
  const [columns, setColumns] = React.useState([])
  const [rowWindow, setRowWindow] = React.useState({ top: 0, bottom: 0, visibleCount: 0 })

  // --- Dimesions
  const dataGridHeight = containerHeight - HEADER_HEIGHT - TOTALS_HEIGHT - HEIGHT_BUFFER - 2 * INNER_BORDER_WIDTH
  const [rowDensity, setRowDensity] = React.useState('dense')
  const rowHeight = rowDensity === 'dense' ? 36 : 52
  const hasScrollbar = rowCount >= rowWindow.visibleCount
  const scrollbarWidth = hasScrollbar ? scrollbarSize() : 0

  // --- Selections
  const [lastSelection, setLastSelection] = React.useState(null)
  const toggleSelectRow = React.useCallback(
    (event, value, index) => {
      const isSelected = selectionMode === 'include'
        ? selected.has(value)
        : !selected.has(value)

      if (event.shiftKey && lastSelection !== null) {
        const bottom = Math.min(lastSelection.index, index)
        const top = Math.max(lastSelection.index, index)

        const values = []
        for (let i = bottom; i <= top; i += 1) {
          if (rows[i]?.id) {
            values.push(rows[i].id)
          }
        }

        if (lastSelection.isSelected) {
          selectMany(values)
        } else {
          unselectMany(values)
        }
        setLastSelection(null)
        return
      }

      toggleSelected(value)
      setLastSelection({ index, isSelected: selectionMode === 'include' ? !isSelected : isSelected })
    },
    [selected, lastSelection, selectionMode]
  )

  const calculateRowWindow = React.useCallback(
    scrollPosition => {
      const visibleTopRow = Math.ceil(scrollPosition / rowHeight)
      const topRow = Math.max(0, visibleTopRow - overscanCount)

      const visibleCount = Math.floor(dataGridHeight / rowHeight)

      const visibleBottomRow = visibleTopRow + visibleCount
      const bottomRow = Math.min(rowCount - 1, visibleBottomRow + overscanCount)

      onItemsRendered?.({ topRow, bottomRow })
      setRowWindow({ topRow, bottomRow, visibleCount })
    },
    [dataGridHeight, rowCount, onItemsRendered, rowHeight]
  )

  React.useEffect(
    () => {
      calculateRowWindow(0)
    },
    [isLoading]
  )

  // --- Scrolling
  const onScroll = React.useCallback(
    (event) => {
      const { clientHeight, scrollHeight, scrollTop } = event.currentTarget

      const scrollPosition = Math.max(
        0,
        Math.min(scrollTop, scrollHeight - clientHeight),
      )

      calculateRowWindow(scrollPosition)
    },
    [calculateRowWindow]
  )

  const debouncedRowWindow = useDebounce(rowWindow, 50)


  // Synchronize changes in the columns from props.
  // Additionally: add alignment and sorting info onto the columns.
  React.useEffect(() => {
    const widths = calculateWidths({
      widths: columnsFromProps.map(column => column?.width ?? 0),
      minWidth: minColumnWidth,
      maxWidth: maxColumnWidth,
      containerWidth,
      actionsWidth: actionsWidth,
      checkboxWidth: rowHeight,
    })

    setColumns(columnsFromProps.map((column, index) => ({
      ...column,
      align: getCellAlignment(column.type),
      width: widths[index],
      sortIcon: getSortIcon({ sortBy, column }),
    })))
  }, [columnsFromProps, containerWidth, sortBy])

  const autoSizeColumns = React.useCallback(
    () => {
      const newWidth = Math.max(
        0,
        safeDivide(containerWidth - rowHeight - actionsWidth, columns.length)
      )

      onColumnResize('__ALL__', newWidth)
    },
    [containerWidth, columns]
  )

  const [dragInfo, setDragInfo] = React.useState(null)

  const startResizing = React.useCallback(
    (event, columnIndex) => {
      const left = columns
        .slice(0, columnIndex)
        .reduce((total, column) => total + column.width, rowHeight)

      setDragInfo({
        columnIndex,
        left,
        initialX: event.clientX,
        width: columns?.[columnIndex]?.width ?? 0,
      })
    },
    [columns]
  )

  const stopResizing = React.useCallback(
    currentX => {
      if (dragInfo) {
        const { width, initialX } = dragInfo
        const newWidth = Math.min(
          maxColumnWidth,
          Math.max(
            minColumnWidth,
            width + (currentX - initialX)
          )
        )

        onColumnResize(dragInfo.columnIndex, newWidth)
        setDragInfo(null)
      }
    },
    [dragInfo]
  )

  return (
    <DataTableContext.Provider
      value={{
        startResizing,
        isResizing: Boolean(dragInfo),
        columns,
        rows,
        selected,
        selectionMode,
        toggleSelected,
        toggleSelectionMode,
        toggleSelectRow,
        sortBy,
        setSortBy,
        customRenderers,
        renderActions,
      }}
    >
      <div className="GenjoDataTable__root">

        <Header
          isLoading={isLoading}
          columns={columns}
          selected={selected}
          rowHeight={rowHeight}
          selectionMode={selectionMode}
          toggleSelectionMode={toggleSelectionMode}
          rowDensity={rowDensity}
          setRowDensity={setRowDensity}
          autoSizeColumns={autoSizeColumns}
          actionsWidth={actionsWidth}
        />

        {isFetching && !isLoading && (
          <div className="GenjoDataTable__fetch-bar">
            <LinearProgress />
          </div>
        )}

        {isLoading ? (
          <div
            className="GenjoDataTable__loading-container"
            style={{ height: dataGridHeight, minHeight: dataGridHeight, maxHeight: dataGridHeight }}
          >
            <CircleLoader size={64} />
          </div>
        ) : rowCount === 0 ? (
          <div
            className="GenjoDataTable__loading-container"
            style={{ height: dataGridHeight, minHeight: dataGridHeight, maxHeight: dataGridHeight }}
          >
            <span>No results found</span>
          </div>
        ) : (
          <div
            className="GenjoDataTable__data-grid"
            style={{
              height: dataGridHeight,
              maxHeight: dataGridHeight,
              minHeight: dataGridHeight,
            }}
            onScroll={onScroll}
          >
            <DataWindow
              rowCount={rowCount}
              rowHeight={rowHeight}
              height={dataGridHeight}
              actionsWidth={actionsWidth}
              scrollbarWidth={scrollbarWidth}
              {...debouncedRowWindow}
            />
          </div>
        )}

        <Totals columns={columns} totals={totals} actionsWidth={actionsWidth} />

        {/* DRAG BOUNDRY */}
        {Boolean(dragInfo) && (
          <DragBoundry
            {...dragInfo}
            onMouseUp={stopResizing}
          />
        )}
      </div>
    </DataTableContext.Provider>
  )
}

DataTable.propTypes = {

}

export default DataTable
