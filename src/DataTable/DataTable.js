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
import { TotalCell } from './components/TotalCell'
import { ResultsLoader } from './components/ResultsLoader'

import CircleLoader from '../CircleLoader'

import { useStyles } from './styles'

const ROW_HEIGHT = 36
const TOTAL_HEIGHT = 56
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const COL_DEFAULT_WIDTH = 100
const HEIGHT_BUFFER = 7
const INNER_BORDER_WIDTH = 2

export const DataTable = ({
  fixedColumnCount = 0,
  height = 0,
  width = 0,
  overscanRowCount = 10,
  rowHeight = ROW_HEIGHT,
  totalHeight = TOTAL_HEIGHT,
  defaultColumnWidth = COL_DEFAULT_WIDTH,
  rowCount,
  columns: columnsFromProps,
  getCellData,
  getHeaderData,
  getSubtotalData,
  getTotalData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
  isLoading = false,
  isFetching = false,
  onItemsRendered,
  sortBy,
  setSortBy,
  subtotalField,
  setSubtotalField,
  subtotals,
}) => {
  const [columns, setColumns] = React.useState([])

  React.useEffect(() => {
    setColumns(columnsFromProps)
  }, [columnsFromProps])

  // Compute the basic dimensions for the grids.
  const hasScrollbar = (height - 2 * rowHeight) / rowHeight < rowCount
  const headerHeight = rowHeight
  const dataGridHeight = height - headerHeight - totalHeight - HEIGHT_BUFFER - 2 * INNER_BORDER_WIDTH

  const classes = useStyles({ hasScrollbar })

  const dataGridRef = React.useRef()
  const headerGridRef = React.useRef()
  const totalGridRef = React.useRef()

  function updateGrid() {
    dataGridRef?.current?.resetAfterColumnIndex(0, true)
    headerGridRef?.current?.resetAfterColumnIndex(0, true)
    totalGridRef?.current?.resetAfterColumnIndex(0, true)
  }

  const { getColumnWidth, widths } = useResizableColumns({
    containerWidth: width,
    columns,
    minWidth: COL_MIN_WIDTH,
    maxWidth: COL_MAX_WIDTH,
    defaultWidth: COL_DEFAULT_WIDTH,
    hasScrollbar,
  })

  React.useEffect(() => {
    updateGrid()
  }, [width, widths, updateGrid, subtotalField, sortBy])

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
      currentWidth: minMax(COL_MIN_WIDTH, dragInfo.currentWidth + deltaX, COL_MAX_WIDTH),
    })
  }

  return (
    <TableContext.Provider
      value={{
        classes,
        columns,
        dragInfo,
        getCellData,
        getHeaderData,
        getColumnWidth,
        getTotalData,
        getSubtotalData,
        handleDrag,
        handleDragEnd,
        handleDragStart,
        height,
        hoveredState,
        maxWidth: COL_MAX_WIDTH,
        minWidth: COL_MIN_WIDTH,
        onHover,
        rowCount,
        rowHeight,
        selectedCells,
        setSortBy,
        setSubtotalField,
        sortBy,
        subtotalField,
        subtotals,
        toggleSelectAll,
        toggleSelectRow,
        width,
      }}
    >
      <div className={classes.root}>
        <div className={classes.headerGridContainer} onMouseLeave={() => setHoveredState([-1, -1])}>
          <VariableSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length + 1}
            columnWidth={getColumnWidth}
            height={rowHeight}
            rowCount={1}
            rowHeight={() => rowHeight}
            width={width}
            ref={headerGridRef}
          >
            {HeaderCell}
          </VariableSizeGrid>
        </div>

        <div className={classes.innerBorder} />

        <div
          className={classes.dataGridContainer}
          style={{ height: dataGridHeight }}
          onMouseLeave={() => setHoveredState([-1, -1])}
        >
          {!isLoading ? (
            <VariableSizeGrid
              columnCount={columns.length + 1}
              columnWidth={getColumnWidth}
              height={dataGridHeight}
              rowCount={rowCount}
              rowHeight={index => {
                return getSubtotalData(index) ? 3 * rowHeight : rowHeight
              }}
              width={width}
              ref={dataGridRef}
              onItemsRendered={onItemsRendered}
              overscanRowCount={overscanRowCount}
            >
              {DataCell}
            </VariableSizeGrid>
          ) : (
            <div className={classes.loadingContainer} style={{ height: dataGridHeight }}>
              <CircleLoader size={64} />
            </div>
          )}
        </div>

        <div className={classes.innerBorder} />

        <div className={classes.totalGridContainer}>
          <VariableSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length + 1}
            columnWidth={getColumnWidth}
            height={totalHeight}
            rowCount={1}
            rowHeight={() => totalHeight}
            width={width}
            ref={totalGridRef}
          >
            {TotalCell}
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
      </div>
    </TableContext.Provider>
  )
}

DataTable.propTypes = {}

export default DataTable
