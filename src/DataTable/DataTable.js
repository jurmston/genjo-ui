import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, alpha } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

import { FixedSizeGrid, VariableSizeGrid } from 'react-window'
import { minMax, safeDivide } from '../utils/math'
import { useResizableColumns } from './useResizableColumns'
import { TableContext } from './context'
import { DataCell } from './DataCell'
import { HeaderCell } from './HeaderCell'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },

  headerGrid: {
    width: '100%',
  },

  dataGrid: {
    width: '100%',
  },

  cell: {

  },

  noScrollbars: {
    scrollbarWidth: 'thin',
    scrollbarColor: 'transparent transparent',

    '&::-webkit-scrollbar': {
      width: 1,
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },

    '&$noScrollbars::-webkit-scrollbar': {
      display: 'none',  /* Safari and Chrome */
    },
  },

  dragBoundry: {
    position: 'absolute',
    borderTopLeftRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary[100], 0.25),
    borderRight: `2px solid ${theme.palette.secondary.main}`,
    top: 0,
    bottom: 0,
  },
}))


const ROW_HEIGHT = 36
const COL_MIN_WIDTH = 50
const COL_MAX_WIDTH = 500
const COL_DEFAULT_WIDTH = 100


export const DataTable = ({
  fixedColumnCount = 0,
  height = 0,
  width = 0,
  overscanColumnCount,
  overscanRowCount,
  rowHeight = ROW_HEIGHT,
  defaultColumnWidth = COL_DEFAULT_WIDTH,
  rowCount,
  columns: columnsFromProps,
  getCellData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
}) => {
  const [columns, setColumns] = React.useState([])

  React.useEffect(
    () => {
      setColumns(columnsFromProps)
    },
    [columnsFromProps]
  )

  const classes = useStyles()

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
      left: cumulativeWidth,
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
      }}
    >
      <div className={classes.root}>

        <div className={classes.headerGrid}>
          <VariableSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length}
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

        <div className={classes.dataGrid}>
          <VariableSizeGrid
            columnCount={columns.length}
            columnWidth={getColumnWidth}
            height={height}
            rowCount={rowCount}
            rowHeight={() => ROW_HEIGHT}
            width={width}
            ref={dataGridRef}
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

      </div>
    </TableContext.Provider>
  )
}

DataTable.propTypes = {

}
