  import * as React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton'

import EditIcon from '@material-ui/icons/EditRounded'
import RemoveIcon from '@material-ui/icons/RemoveCircleRounded'
import FavoriteIcon from '@material-ui/icons/FavoriteRounded'

import getCellAlignment from '../DataTable/utils/getCellAlignment'
import getSortIcon from '../DataTable/utils/getSortIcon'

import useDebounce from '../useDebounce'

import Checkbox from '../Checkbox'
import CircleLoader from '../CircleLoader'
import { HeaderCell } from './HeaderCell'
import { DragBoundry } from './DragBoundry'
import { DataWindow } from './DataWindow'

import './styles.css'
import { calculateWidths } from './utils/calculateWidths'
import debounce from '@material-ui/utils/debounce'

export const DataTableContext = React.createContext()
export const useDataTable = () => React.useContext(DataTableContext)

const ROW_HEIGHT = 36
const HEADER_HEIGHT = 48
const TOTALS_HEIGHT = 56
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const HEIGHT_BUFFER = 7
const INNER_BORDER_WIDTH = 2
const COL_DEFAULT_WIDTH = 100
const DATA_GRID_OUTER_BORDERS = 2

const ACTIONS_WIDTH = 100


export const DataTableDeux = ({
  rowCount,
  rows = {},
  overscanCount = 30,
  isFetching = false,
  isLoading = false,
  containerHeight = 0,
  containerWidth = 0,
  columns: columnsFromProps = [],
  onItemsRendered,
  selected,
  selectionMode,
  toggleSelected,
  toggleSelectionMode,
}) => {
  const [columns, setColumns] = React.useState([])
  const [rowWindow, setRowWindow] = React.useState({ top: 0, bottom: 0 })

  const dataGridHeight = containerHeight - HEADER_HEIGHT - TOTALS_HEIGHT - HEIGHT_BUFFER - 2 * INNER_BORDER_WIDTH

  const calculateRowWindow = React.useCallback(
    scrollPosition => {
      const visibleTopRow = Math.ceil(scrollPosition / ROW_HEIGHT)
      const topRow = Math.max(0, visibleTopRow - overscanCount)

      const visibleRowsCount = Math.floor(dataGridHeight / ROW_HEIGHT)

      const visibleBottomRow = visibleTopRow + visibleRowsCount
      const bottomRow = Math.min(rowCount - 1, visibleBottomRow + overscanCount)

      onItemsRendered?.({ topRow, bottomRow })
      setRowWindow({ topRow, bottomRow })
    },
    [dataGridHeight, rowCount, onItemsRendered]
  )

  React.useEffect(
    () => {
      calculateRowWindow(0)
    },
    []
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

  const sorting = null


  // Synchronize changes in the columns from props.
  // Additionally: add alignment and sorting info onto the columns.
  React.useEffect(() => {
    const widths = calculateWidths({
      widths: columns.map(column => column?.width ?? 0),
      minWidth: 100,
      maxWidth: 500,
      containerWidth,
      actionsWidth: ACTIONS_WIDTH,
      checkboxWidth: ROW_HEIGHT,
    })

    setColumns(columnsFromProps.map((column, index) => ({
      ...column,
      align: getCellAlignment(column.type),
      width: widths[index],
      sortIcon: column.isSortable ? getSortIcon({
        type: column.type,
        direction: sorting?.key === column.dataKey
          ? sorting?.direction
          : '',
      }) : null,
    })))
  }, [columnsFromProps, containerWidth])


  const [dragInfo, setDragInfo] = React.useState(null)

  const startResizing = React.useCallback(
    (event, columnIndex) => {
      const left = columns
        .slice(0, columnIndex)
        .reduce((total, column) => total + column.width, ROW_HEIGHT)

      setDragInfo({
        left,
        initialX: event.clientX,
        width: columns?.[columnIndex]?.width ?? 0,
      })
    },
    [columns]
  )

  const stopResizing = React.useCallback(
    () => {
      setDragInfo(null)
    },
    []
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
      }}
    >
      <div className="GenjoDataTable__root">

        {/* HEADER */}
        <div
          className={clsx(
            'GenjoDataTable__row',
            'GenjoDataTable__header-row',
          )}
          style={{ height: HEADER_HEIGHT }}
        >
          {/* FIXED HEADER */}
          <div
            className="GenjoDataTable__cell"
            style={{ width: ROW_HEIGHT, maxWidth: ROW_HEIGHT, minWidth: ROW_HEIGHT }}
          >
            <Checkbox
              checked={selectionMode === 'exclude'}
              onClick={toggleSelectionMode}
            />
          </div>

          {columns.map((column, index) => (
            <HeaderCell
              index={index}
              key={column.dataKey}
              column={column}
            />
          ))}

          <div
            style={{
              height: HEADER_HEIGHT,
            }}
          />
        </div>

        {isFetching && !isLoading && (
          <div className="GenjoDataTable__fetch-bar" style={{ top: ROW_HEIGHT }}>
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
              height={dataGridHeight}
              {...debouncedRowWindow}
            />
          </div>
        )}

        <div className="GenjoDataTable__totals" style={{ height: TOTALS_HEIGHT }}>
          Totals
        </div>

        {/* DRAG BOUNDRY */}
        {Boolean(dragInfo) && (
          <DragBoundry
            {...dragInfo}
            onMouseUp={stopResizing}
          />
        )}
        {/*dragInfo.columnIndex > -1 && (
          <div
            className="GenjoDataTable__drag-boundry"
            style={{
              left: dragInfo?.left,
              width: dragInfo?.currentWidth,
              zIndex: 9999,
            }}
          />
          )*/}
      </div>
    </DataTableContext.Provider>
  )
}

DataTableDeux.propTypes = {

}
