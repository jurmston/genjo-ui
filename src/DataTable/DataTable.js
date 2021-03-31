import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import TableCell from '@material-ui/core/TableCell'
import LinearProgress from '@material-ui/core/LinearProgress'

import { FixedSizeGrid, VariableSizeGrid } from 'react-window'
import { minMax, safeDivide } from '../utils/math'
import { useResizableColumns } from './useResizableColumns'
import { TableContext } from './context'
import { DataCell } from './components/DataCell'
import { HeaderCell } from './components/HeaderCell'
import { ResultsLoader } from './components/ResultsLoader'

import { useStyles } from './styles'

const ROW_HEIGHT = 36
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const COL_DEFAULT_WIDTH = 100


export const DataTable = ({
  fixedColumnCount = 0,
  height = 0,
  width = 0,
  overscanRowCount = 10,
  rowHeight = ROW_HEIGHT,
  defaultColumnWidth = COL_DEFAULT_WIDTH,
  rowCount,
  columns: columnsFromProps,
  getCellData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
  isLoading = false,
  isFetching = false,
  onItemsRendered,
  sortBy,
  setSortBy,
}) => {
  const [columns, setColumns] = React.useState([])

  const hasScrollbar = (height - 2 * rowHeight) / rowHeight < rowCount

  React.useEffect(
    () => {
      setColumns(columnsFromProps)
    },
    [columnsFromProps]
  )

  const classes = useStyles({ hasScrollbar })

  const dataGridRef = React.useRef()
  const headerGridRef = React.useRef()

  function updateGrid() {
    dataGridRef?.current?.resetAfterColumnIndex(0, true)
    headerGridRef?.current?.resetAfterColumnIndex(0, true)
  }

  const {
    getColumnWidth,
    widths,
  } = useResizableColumns({
    containerWidth: width,
    columns,
    minWidth: COL_MIN_WIDTH,
    maxWidth: COL_MAX_WIDTH,
    defaultWidth: COL_DEFAULT_WIDTH,
    hasScrollbar,
  })

  React.useEffect(
    () => {
      updateGrid()
    },
    [width, widths, updateGrid]
  )

  const [hoveredState, setHoveredState] = React.useState([-1, -1])

  function onHover(rowIndex, columnIndex) {
    setHoveredState([rowIndex, columnIndex])
  }

  const [dragInfo, setDragInfo] = React.useState(null)

  function handleDragStart(event, columnIndex) {
    const cumulativeWidth = widths.slice(0, columnIndex).reduce((result, width) => {
      return result + width
    }, 0)

    setDragInfo({
      columnIndex,
      left: cumulativeWidth + 36,
      currentWidth: getColumnWidth(columnIndex),
    })
  }

  function handleDragEnd(event) {
    const newColumns = [...columns]
    newColumns[dragInfo.columnIndex].width = dragInfo.currentWidth
    setColumns(newColumns)
    setDragInfo(null)
  }

  function handleDrag(event, { deltaX }) {
    setDragInfo({
      ...dragInfo,
      currentWidth: minMax(
        COL_MIN_WIDTH,
        dragInfo.currentWidth + deltaX,
        COL_MAX_WIDTH,
      ),
    })
  }

  return (
    <TableContext.Provider
      value={{
        classes,
        getCellData,
        columns,
        onHover,
        hoveredState,
        height,
        minWidth: COL_MIN_WIDTH,
        maxWidth: COL_MAX_WIDTH,
        getColumnWidth,
        dragInfo,
        handleDrag,
        handleDragEnd,
        handleDragStart,
        selectedCells,
        toggleSelectAll,
        toggleSelectRow,
        rowCount,
        sortBy,
        setSortBy,
      }}
    >
      <div className={classes.root}>

        <div className={classes.headerGrid}>
          <VariableSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length + 1}
            columnWidth={getColumnWidth}
            height={ROW_HEIGHT}
            rowCount={1}
            rowHeight={() => ROW_HEIGHT}
            width={width}
            ref={headerGridRef}
          >
            {HeaderCell}
          </VariableSizeGrid>
        </div>

        <ResultsLoader
          isLoading={isLoading}
          isFetching={isFetching}
          count={rowCount}
        />

        <div className={classes.dataGrid}>
          <VariableSizeGrid
            columnCount={columns.length + 1}
            columnWidth={getColumnWidth}
            height={height - ROW_HEIGHT}
            rowCount={rowCount}
            rowHeight={() => ROW_HEIGHT}
            width={width}
            ref={dataGridRef}
            onItemsRendered={onItemsRendered}
            overscanRowCount={overscanRowCount}
          >
            {DataCell}
          </VariableSizeGrid>

        </div>

        {Boolean(dragInfo) && (
          <div
            className={classes.dragBoundry}
            style={{
              left: dragInfo?.left,
              width: dragInfo?.currentWidth,
              zIndex: 9999,
            }}
          />
        )}

        {hasScrollbar && (
          <div
            className={classes.scrollbarCap}
            style={{ height: rowHeight }}
          />
        )}

      </div>
    </TableContext.Provider>
  )
}

DataTable.propTypes = {

}
