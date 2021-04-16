import React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import { VariableSizeGrid } from 'react-window'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import CircleLoader from '../CircleLoader'

import DataCell from './DataCell'
import DataTableContext from './DataTableContext'
import getCellAlignment from './utils/getCellAlignment'
import getSortIcon from './utils/getSortIcon'
import HeaderCell from './HeaderCell'
import TotalCell from './TotalCell'
import useColumnWidths from './useColumnWidths'
import useHovering from './useHovering'
import useResizing from './useResizing'
import useStyles from './styles'


const ROW_HEIGHT = 36
const TOTAL_HEIGHT = 56
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const HEIGHT_BUFFER = 7
const INNER_BORDER_WIDTH = 2
const COL_DEFAULT_WIDTH = 100
const DATA_GRID_OUTER_BORDERS = 2


export const DataTable = ({
  customRenderers = {},
  headerHeight = ROW_HEIGHT,
  containerHeight = 0,
  isFetching = false,
  isLoading = false,
  minColumnWidth = COL_MIN_WIDTH,
  maxColumnWidth = COL_MAX_WIDTH,
  defaultColumnWidth = COL_DEFAULT_WIDTH,
  onItemsRendered,
  onRowClick,
  overscanRowCount = 10,
  rowCount,
  rowHeight = ROW_HEIGHT,
  selector,
  sorting,
  totalHeight = TOTAL_HEIGHT,
  containerWidth = 0,
  actions = [],

  columnData,
  rowData,
  subtotalData,
  isLoadingTotals = false,
  hasTotals = false,
  totalData,
  subtotals,

  onRowSelect,
}) => {
  const [columns, setColumns] = React.useState([])

  // Synchronize changes in the columns from props.
  // Additionally: add alignment and sorting info onto the columns.
  React.useEffect(() => {
    setColumns(columnData.map(column => ({
      ...column,
      align: getCellAlignment(column.type),
      sortIcon: column.isSortable ? getSortIcon({
        type: column.type,
        direction: sorting?.key === column.dataKey
          ? sorting?.direction
          : '',
      }) : null,
    })))
  }, [columnData])

  // Compute the basic dimensions for the grids.
  const hasScrollbar = (containerHeight - 2 * rowHeight) / rowHeight < rowCount
  const dataGridHeight = containerHeight - headerHeight - totalHeight - HEIGHT_BUFFER - 2 * INNER_BORDER_WIDTH

  // Initialize styles based on the calculated dimensions
  const classes = useStyles()

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

  // Synchronize the react-window grids to the calculated column widths
  React.useEffect(() => {
    updateGrid()
  }, [containerWidth, widths, updateGrid])

  const { getColumnWidth, widths } = useColumnWidths({
    containerWidth,
    columns,
    minColumnWidth,
    maxColumnWidth,
    defaultColumnWidth,
    hasScrollbar,
    actionsWidth: actions?.length * 28,
  })

  const { hoveredState, onHover } = useHovering()

  const { dragInfo, startResizing, stopResizing, onResize } = useResizing({
    getColumnWidth,
    widths,
    columns,
    setColumns,
    minColumnWidth,
    maxColumnWidth,
  })

  const getItemKey = React.useCallback(
    ({ columnIndex, rowIndex, data }) => {
      const item = data[rowIndex]

      return `${item?.id ?? rowIndex}-${columnIndex}`
    },
    [],
  )

  const itemData = React.useMemo(
    () => ({
      rows: rowData,
      subtotals: subtotalData,
      columns,
      classes,
      onHover,
      hoveredState,
      rowHeight,
      selector,
      customRenderers,
      onRowSelect,
    }),
    [rowData, subtotalData, columns, classes, onHover, hoveredState, rowHeight, selector, customRenderers, onRowSelect],
  )

  /**
   * Getter for the data grid row height.
   * @param {number} rowIndex The index of the row.
   */
  function getRowHeight(rowIndex) {
    const { subtotalType } = subtotalData?.[rowIndex] ?? {}

    return subtotalType === 'title'
      ? 2 * rowHeight
      : subtotalType === 'value'
      ? 3 * rowHeight
      : rowHeight
  }

  return (
    <DataTableContext.Provider
      value={{
        classes,
        columns,
        isDragging: Boolean(dragInfo),
        getColumnWidth,
        onResize,
        startResizing,
        stopResizing,
        containerWidth,
        headerHeight,
        hoveredState,
        onHover,
        rowCount,
        rowHeight,
        containerHeight,
        onRowClick,
        selector,
        sorting,
        customRenderers,
        actions,
        subtotals,
      }}
    >
      <div className={classes.root}>
        {isFetching && !isLoading && <LinearProgress />}

        {/* HEADER */}
        <div className={classes.headerGridContainer} onMouseLeave={() => onHover(-1, -1)}>
          <VariableSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length}
            columnWidth={getColumnWidth}
            height={headerHeight}
            rowCount={1}
            rowHeight={() => headerHeight}
            width={containerWidth}
            ref={headerGridRef}
          >
            {HeaderCell}
          </VariableSizeGrid>
        </div>

        <div className={classes.innerBorder} />

        {/* DATA GRID */}
        <div
          className={classes.dataGridContainer}
          style={{ height: dataGridHeight }}
          onMouseLeave={() => onHover(-1, -1)}
        >
          {isLoading ? (
            <div
              className={classes.loadingContainer}
              style={{ height: dataGridHeight }}
            >
              <CircleLoader size={64} />
            </div>
          ) : rowCount === 0 ? (
            <div
              className={classes.loadingContainer}
              style={{ height: dataGridHeight }}
            >
              No results found
            </div>
          ) : (
            <VariableSizeGrid
              columnCount={columns.length}
              columnWidth={getColumnWidth}
              height={dataGridHeight}
              rowCount={rowCount}
              rowHeight={getRowHeight}
              width={containerWidth - DATA_GRID_OUTER_BORDERS}
              ref={dataGridRef}
              onItemsRendered={onItemsRendered}
              overscanRowCount={overscanRowCount}
              itemData={itemData}
              itemKey={getItemKey}
            >
              {DataCell}
            </VariableSizeGrid>
          )}
        </div>

        <div className={classes.innerBorder} />

        {/* TOTALS */}
        {hasTotals && (
          <div
            className={classes.totalGridContainer}
            style={{ height: totalHeight }}
          >
            {isLoadingTotals ? (
              <LinearProgress />
            ) : (
              <VariableSizeGrid
                className={clsx(classes.noScrollbars)}
                columnCount={columns.length}
                columnWidth={getColumnWidth}
                rowCount={1}
                height={totalHeight}
                rowHeight={() => totalHeight}
                width={containerWidth}
                ref={totalGridRef}
                itemData={totalData}
              >
                {TotalCell}
              </VariableSizeGrid>
            )}
          </div>
        )}

        {/* DRAG BOUNDRY */}
        {dragInfo.columnIndex > -1 && (
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
  /** A list of action schemas for action buttons. */
  actions: PropTypes.arrayOf(PropTypes.shape({
    /** The icon node for the button. */
    icon: PropTypes.node,
    /**
     * Callback when the action button is clicked
     * @param {object} event The callback event.
     * @param {number} rowIndex The index of the clicked row.
     */
    onClick: PropTypes.func,
    /** THe title of the action button. */
    title: PropTypes.string,
  })),

  /** Schema for the columns */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** A unique identifier for the column. */
    dataKey: PropTypes.string,
    /** The data type of the column value. */
    type: PropTypes.string,
    /** The title of the column. */
    title: PropTypes.string,
    /** If `true` the column will be sortable. */
    isSortable: PropTypes.bool,
    /** If `true` the column will render subtotals. */
    hasSubtotals: PropTypes.bool,
    /** The value of the total in the footer row. */
    totalValue: PropTypes.any,
    /** The label of the total in the footer row. */
    totalLabel: PropTypes.string,
    /**
     * (Optional) Override for the column type if the total type is different.
     * Example: is_active is a 'bool' column, but the total value is the count
     * of active users (i.e. type = 'number')
     */
    totalType: PropTypes.string,
    /**
     * The desired width of the column. The column may not render to this width
     * if there is not enough available space.
     */
    width: PropTypes.number,
  })),

  /** The height of the container element. */
  containerHeight: PropTypes.number,

  /** The width of the container element. */
  containerWidth: PropTypes.number,

  /**
   * (Optinal) key-value pair of customer column types and a render function.
   *
   * example: { person: value => value?.fullName ?? '' }
   */
   customRenderers: PropTypes.objectOf(
    PropTypes.func,
  ),

  /** The default desired width of the columns. */
  defaultColumnWidth: PropTypes.number,

  /** The height of the header row. */
  headerHeight: PropTypes.number,

  /**
   * If `true` a loading progress bar will be shown with any cached data.
   * See react-query for the difference isLoading and isFetching:
   * https://react-query.tanstack.com/reference/useQuery
  */
  isFetching: PropTypes.bool,

  /** If `true` the data rows will be replaced by a loading spinner. */
  isLoading: PropTypes.bool,


  /** The maximum width of the columns. */
  maxColumnWidth: PropTypes.number,

  /** The minimum desired width of the columns. */
  minColumnWidth: PropTypes.number,

  /**
   * Callback when a row in the table window has been rendered.
   * See: https://react-window.vercel.app/#/api/FixedSizeGrid
   */
  onItemsRendered: PropTypes.func,

  /**
   * Optional callback when a row in clicked.
   *
   * @param {object} event The click event.
   * @param {number} rowIndex The index of the row clicked.
   */
  onRowClick: PropTypes.func,

  /** The number of rows to overscan for smoother react-window rendering */
  overscanRowCount: PropTypes.number,

  /** The total count of rows in the data set. */
  rowCount: PropTypes.number,

  /** The height of the data rows. */
  rowHeight: PropTypes.number,

  /**
   * (Optional) Plugin for allowing selectable rows.
   */
  selector: PropTypes.shape({
    /** A set containing the currently selected indexes. */
    selected: PropTypes.any, // TODO: find the proper type for sets.
    toggleAll: PropTypes.func,
    toggle: PropTypes.func,
  }),

  /**
   * (Optional) Plugin for allowing sortable columns.
   */
  sorting: PropTypes.shape({
    /** The current column dataKay that is being sorted. */
    key: PropTypes.string,
    /** The direction of the sort. 'ASC' for ascending. 'DESC' for descending. */
    direction: PropTypes.oneOf(['', 'ASC', 'DESC']),
    /** Setter for the sorting key */
    setSortingKey: PropTypes.func,
  }),

  /**
   * (Optional) Plugin for allowing subtotal summaries.
   */
  subtotals: PropTypes.shape({
    /** The current column data key that is being summarized. */
    key: PropTypes.key,
    /** Setter for the subtotal key. */
    setSubtotalKey: PropTypes.func,
  }),

  /** The height of the total row. */
  totalHeight: PropTypes.number,
}

export default DataTable
