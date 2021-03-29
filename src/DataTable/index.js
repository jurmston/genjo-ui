import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

import { FixedSizeGrid } from 'react-window'
import { safeDivide } from 'src/utils/safeDivide'
import { useResizableColumns } from './useResizableColumns'
import { TableContext } from './context'
import { DataCell } from './DataCell'
import { HeaderCell } from './HeaderCell'


const useStyles = makeStyles(theme => ({
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
}))


const ROW_HEIGHT = 36
const COL_MIN_WIDTH = 64
const COL_MAX_WIDTH = 800



const Table = ({
  fixedColumnCount = 0,
  height = 0,
  width = 0,
  overscanColumnCount,
  overscanRowCount,
  rowHeight = ROW_HEIGHT,
  defaultColumnWidth = 300,
  rowCount,
  columns,
  getCellData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
}) => {

  const classes = useStyles()

  const {
    widths,
    handleResizeColumn,
    fixedColumnWidth,
    totalWidth,
  } = useResizableColumns({
    containerWidth: width,
    columns,
    fixedColumnCount,
    minWidth: COL_MIN_WIDTH,
    maxWidth: COL_MAX_WIDTH,
  })

  const [hoveredState, setHoveredState] = React.useState([-1, -1])

  const _getColumnWidth = React.useCallback(
    index => widths[index] ?? defaultColumnWidth,
    [widths, defaultColumnWidth],
  )

  function onHover(rowIndex, columnIndex) {
    setHoveredState([rowIndex, columnIndex])
  }

  const columnWidth = safeDivide(width, columns.length)

  return (
    <TableContext.Provider
      value={{
        getCellData,
        columns,
        onHover,
        hoveredState,
        handleResizeColumn,
      }}
    >
      <div className={classes.root}>

        <div className={classes.headerGrid}>
          <FixedSizeGrid
            className={clsx(classes.noScrollbars)}
            columnCount={columns.length}
            columnWidth={columnWidth}
            height={ROW_HEIGHT}
            rowCount={1}
            rowHeight={ROW_HEIGHT}
            width={width}
          >
            {HeaderCell}
          </FixedSizeGrid>
        </div>

        <FixedSizeGrid
          columnCount={columns.length}
          columnWidth={columnWidth}
          height={height}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT}
          width={width}
        >
          {DataCell}
        </FixedSizeGrid>

      </div>
    </TableContext.Provider>
  )
}

Table.propTypes = {

}

export { Table }
