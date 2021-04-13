import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { VariableSizeGrid } from 'react-window'
import { minMax } from '../utils/math'
import { useResizableColumns } from './useResizableColumns'
import { DataCell } from './components/DataCell'
import { HeaderCell } from './components/HeaderCell'
import { TotalCell } from './components/TotalCell'

import DataTableContext from './DataTableContext'
import CircleLoader from '../CircleLoader'

import { useStyles } from './styles'

import getCellAlignment from './utils/getCellAlignment'


const ROW_HEIGHT = 36
const TOTAL_HEIGHT = 56
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const HEIGHT_BUFFER = 7
const INNER_BORDER_WIDTH = 2


/**
 *
 *
 * COLUMNS = [
 *   {
 *     key: string,
 *     type: string,
 *     title: string,
 *     totalValue: any,
 *     totalType: string,
 *     totalTitle: string,
 *     width: number,
 *   }
 *
 */
export const DataTable = ({
  height = 0,
  width = 0,
  overscanRowCount = 10,
  rowHeight = ROW_HEIGHT,
  totalHeight = TOTAL_HEIGHT,
  rowCount,
  columns: columnsFromProps,
  getCellData,
  getSubtotalData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
  isLoading = false,
  onItemsRendered,
  sortBy,
  setSortBy,
  subtotalField,
  setSubtotalField,
  subtotals,
  onRowClick,
}) => {
  const [columns, setColumns] = React.useState([])

  React.useEffect(() => {
    setColumns(columnsFromProps.map(column => ({
      ...column,
      align: getCellAlignment(column.type),
    })))
  }, [columnsFromProps])

  // Compute the basic dimensions for the grids.
  const hasScrollbar = (height - 2 * rowHeight) / rowHeight < rowCount
  const headerHeight = rowHeight
  const dataGridHeight = height - headerHeight - totalHeight - HEIGHT_BUFFER - 2 * INNER_BORDER_WIDTH

  // Initialize styles based on the calculated dimensions
  const classes = useStyles({ hasScrollbar })

  const dataGridRef = React.useRef()
  const headerGridRef = React.useRef()
  const totalGridRef = React.useRef()

  /**
   * Callback to recompute the react-window grids.
   */
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
    defaultWidth: width / columns.length,
    hasScrollbar,
  })

  // Synchronize the react-window grids to the calculated column widths
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

  function handleDragEnd() {
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
    <DataTableContext.Provider
      value={{
        classes,
        columns,
        dragInfo,
        getCellData,
        getColumnWidth,
        getSubtotalData,
        handleDrag,
        handleDragEnd,
        handleDragStart,
        height,
        hoveredState,
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
        onRowClick,
      }}
    >
      <div className={classes.root}>

        {/* HEADER */}
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

        {/* DATA */}
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

        {/* TOTALS */}
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

        {/* DRAG BOUNDRY */}
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
    </DataTableContext.Provider>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  getCellData: PropTypes.func,
  getSubtotalData: PropTypes.func,
  height: PropTypes.number,
  isLoading: PropTypes.bool,
  onItemsRendered: PropTypes.func,
  onRowClick: PropTypes.func,
  overscanRowCount: PropTypes.number,
  rowCount: PropTypes.number,
  rowHeight: PropTypes.number,
  selectedCells: PropTypes.any,
  setSortBy: PropTypes.func,
  setSubtotalField: PropTypes.func,
  sortBy: PropTypes.string,
  subtotalField: PropTypes.string,
  subtotals: PropTypes.object,
  toggleSelectAll: PropTypes.func,
  toggleSelectRow: PropTypes.func,
  totalHeight: PropTypes.number,
  width: PropTypes.number,
}

export default DataTable
