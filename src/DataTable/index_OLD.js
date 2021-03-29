import * as React from 'react'

import scrollbarSize from 'dom-helpers/scrollbarSize'
import { MultiGrid } from 'react-virtualized'

import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { colors } from 'src/styles/colors'

import clsx from 'clsx'

import { safeDivide } from 'src/utils/safeDivide'

import { useResizableColumns } from './useResizableColumns'

import { HeaderCell } from './HeaderCell'


const ROW_HEIGHT = 36

const COL_MIN_WIDTH = 64
const COL_MAX_WIDTH = 800


const useStyles = makeStyles(theme => ({

  fixedColumnShadow: {
    position: 'absolute',
    top: 0,
    marginLeft: -1,
    width: 1,
    boxShadow: '1px 0px 1px -2px rgba(0,0,0,0.2),2px 0px 2px 0px rgba(0,0,0,0.14)',
    zIndex: 999,
  },

  gridContainer: {
    outline: 'none',
  },

  headerCell: {
    borderBottom: `2px solid ${colors.blueGrey[300]}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
      '& $resizeHeaderButton': {
        opacity: 1,
      },
    },

    // MultiGrid appends a little filler region when the scroll bar is turned
    // off. This selector gets that region if it's visible and adds the bottom
    // border to make it look seemless with the rest of the headers.
    '&:nth-last-child(2) ~ div:not($headerCell)': {
      borderBottom: `2px solid ${colors.blueGrey[300]}`,
    }
  },

  hasContent: {},
  isFirst: {},
  isLast: {},
  totalCell: {
    borderTop: `2px solid ${colors.blueGrey[300]}`,

    '&$hasContent': {
      backgroundColor: colors.blueGrey[50],
      borderBottom: `1px solid ${colors.blueGrey[300]}`,

      '&$isFirst': {
        borderLeft: `1px solid ${colors.blueGrey[300]}`,
        borderBottomLeftRadius: theme.shape.borderRadius,
      },

      '&$isLast': {
        borderRight: `1px solid ${colors.blueGrey[300]}`,
        borderBottomRightRadius: theme.shape.borderRadius,
      },
    },

  },

  headerCellContent: {
    // opacity: 0,z

    position: 'relative',
    width: '100%',
  },

  resizeHeaderButton: {
    transition: theme.transitions.create('opacity'),
    opacity: 0,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 6,
    height: 24,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: colors.blueGrey[700],
    cursor: 'col-resize',
  },

  cell: {
    transition: 'background-color 300ms linear',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    '& > div': {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  hoveredRowCell: {},
  hoveredColumnCell: {},
  isSelected: {},
  roundBottom: {},
  roundTop: {},
  dataCell: {
    borderBottom: 'none',
    padding: 4,
    textAlign: 'left',
    ...theme.typography.body2,

    transition: 'background-color 300ms linear',

    '&$roundTop': {
      borderTopLeftRadius: theme.shape.borderRadius,
    },

    '&$roundBottom': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    '&$hoveredRowCell': {
      backgroundColor: colors.blueGrey[50],
    },

    '&$hoveredColumnCell': {
      backgroundColor: theme.palette.grey[100],

      '&$hoveredRowCell': {
        backgroundColor: colors.blueGrey[100],
        zIndex: 9999,
        overflow: 'visible',
        '& > div': {
          backgroundColor: colors.blueGrey[100],
          width: 'unset',
        }
      },
    },

    '&$isSelected': {
      backgroundColor: colors.amber[100],
    },

  },

  totalPrimary: {
    color: colors.blueGrey[900],
    fontWeight: 700,
  },

  totalSecondary: {
    color: colors.blueGrey[500],
    fontWeight: 300,
  },
}))


export function Table({
  // columns = testDataColumnSet,
  fixedColumnCount = 2,
  height = 0,
  width = 0,
  overscanColumnCount,
  overscanRowCount,
  rowHeight = ROW_HEIGHT,
  defaultColumnWidth = 100,
  rowCount,
  columns,
  getCellData,
  selectedCells,
  toggleSelectAll,
  toggleSelectRow,
}) {
  const [hoveredState, setHoveredState] = React.useState([-1, -1])

  const [scrollInfo, setScrollInfo] = React.useState({
    scrollLeft: 0,
    scrollTop: 0,
  })

  const classes = useStyles(scrollInfo)

  // Resizable columns
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

  const _getColumnWidth = React.useCallback(
    ({ index }) => {
      return widths[index] ?? defaultColumnWidth
    },
    [widths, defaultColumnWidth],
  )

  const _getTotalColumnWidth = React.useCallback(
    ({ index }) => {
      const baseWidth = widths[index] ?? defaultColumnWidth

      const scrollbarWidth = index === widths.length - 1
        ? scrollbarSize()
        : 0

      return baseWidth + scrollbarWidth
    },
    [widths, defaultColumnWidth],
  )

  // Recomputing columns widths needs to be manually triggered:
  // See: https://github.com/bvaughn/react-virtualized/issues/136
  const gridRef = React.useRef()
  const totalGridRef = React.useRef()

  React.useEffect(
    () => {
      gridRef?.current?.recomputeGridSize()
      totalGridRef?.current?.recomputeGridSize()
    },
    [
      widths,
      gridRef,
      totalGridRef,
    ]
  )


  const handleHoverCell = React.useCallback(
    (rowIndex, columnIndex) => {
      setHoveredState([rowIndex, columnIndex])
      gridRef?.current?.forceUpdateGrids()
    },
    [gridRef],
  )


  function _renderDataCell({ key, columnIndex, style, rowIndex }) {
    return (
      <div
        key={key}
        onMouseOver={() => handleHoverCell(rowIndex, columnIndex)}
        className={clsx(
          classes.cell,
          classes.dataCell,
          selectedCells.has(rowIndex) && classes.isSelected,
          hoveredState[0] === rowIndex && classes.hoveredRowCell,
          hoveredState[1] === columnIndex && classes.hoveredColumnCell,
        )}
        style={style}
      >
        <div>
          {getCellData(rowIndex - 1, columnIndex)}
        </div>
      </div>
    )
  }



  function _renderCell({ key, columnIndex, style, rowIndex }) {

    if (columnIndex === 0) {
      return (
        <TableCell
          component="div"
          variant={rowIndex === 0 ? 'head' : 'body'}
          padding="checkbox"
          align="center"
          key={key}
          style={style}
          className={clsx(
            classes.cell,
            rowIndex === 0 && classes.headerCell,
            rowIndex > 0 && hoveredState[0] === rowIndex && classes.hoveredRowCell,
            rowIndex > 0 && hoveredState[1] === columnIndex && classes.hoveredColumnCell,
            rowIndex > 0 && classes.dataCell,
            rowIndex > 1 && classes.roundBottom,
            rowIndex < rowCount - 2 && classes.roundTop,
            selectedCells.has(rowIndex) && classes.isSelected,
          )}
          onMouseOver={() => handleHoverCell(rowIndex, columnIndex)}
        >
          <Checkbox
            indeterminate={rowIndex === 0 && selectedCells.size && selectedCells.size < rowCount}
            checked={rowIndex === 0
              ? selectedCells.size === rowCount
              : selectedCells.has(rowIndex)
            }
            onClick={() => rowIndex === 0
              ? toggleSelectAll()
              : toggleSelectRow(rowIndex)
            }
          />
        </TableCell>
      )
    }

    if (rowIndex === 0) {
      const label = columns[columnIndex].title

      return (
        <HeaderCell
          label={label}
          key={key}
          dataKey={key}
          style={style}
          handleResizeColumn={handleResizeColumn}
          handleHoverCell={handleHoverCell}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
        >
          {label}
        </HeaderCell>
      )
    }

    return _renderDataCell({ key, style, rowIndex, columnIndex })

  }

  function _renderTotalCell({ key, columnIndex, style }) {

    const { total } = columns[columnIndex]

    const isFirst = !Boolean(columns?.[columnIndex - 1]?.total)
    const isLast = !Boolean(columns?.[columnIndex + 1]?.total)

    return (
      <TableCell
        component="div"
        variant="head"
        align="left"
        key={key}
        style={style}
        className={clsx(
          classes.cell,
          classes.totalCell,
          Boolean(total) && classes.hasContent,
          isFirst && classes.isFirst,
          isLast && classes.isLast,
        )}
      >
        {Boolean(total) && (
          <>
            <Typography variant="caption" component="div" className={classes.totalSecondary}>Total</Typography>
            <Typography component="div" className={classes.totalPrimary}>$2,400.23</Typography>
          </>
        )}
      </TableCell>
    )
  }



  // Selection


  React.useEffect(
    () => {
      gridRef?.current?.forceUpdateGrids()
    },
    [selectedCells, gridRef]
  )

  // Calculate the scroll left for the total row
  const { scrollLeft } = scrollInfo

  // Calculate the width of the window that is scrollable
  const scrollableWidth = totalWidth - width + scrollbarSize()

  const percentScrolled = safeDivide(
    scrollLeft,
    scrollableWidth,
  )

  const totalRowScrollLeft = percentScrolled * (totalWidth - width + scrollbarSize())

  const totalRowHeight = 20 + 14 + 8 + 4 + 8

  return (
    <div
      style={{ position: 'relative' }}
      onMouseLeave={() => setHoveredState([-1, -1])}
    >
      <MultiGrid
        ref={gridRef}
        fixedColumnCount={fixedColumnCount}
        fixedRowCount={1}
        cellRenderer={_renderCell}
        columnWidth={_getColumnWidth}
        columnCount={columns.length}
        enableFixedColumnScroll
        enableFixedRowScroll
        height={height - totalRowHeight - scrollbarSize()}
        rowHeight={rowHeight}
        rowCount={rowCount + 1}
        width={width}
        hideTopRightGridScrollbar
        hideBottomLeftGridScrollbar
        onScroll={setScrollInfo}
        classNameTopLeftGrid={classes.gridContainer}
        classNameTopRightGrid={classes.gridContainer}
        classNameBottomLeftGrid={classes.gridContainer}
        classNameBottomRightGrid={classes.gridContainer}
      />

      <MultiGrid
        ref={totalGridRef}
        fixedColumnCount={fixedColumnCount}
        fixedRowCount={1}
        cellRenderer={_renderTotalCell}
        columnWidth={_getTotalColumnWidth}
        columnCount={columns.length}
        height={totalRowHeight}
        rowHeight={totalRowHeight}
        rowCount={1}
        width={width}
        scrollLeft={totalRowScrollLeft}
        hideTopRightGridScrollbar
        hideBottomLeftGridScrollbar
        classNameTopLeftGrid={classes.gridContainer}
        classNameTopRightGrid={classes.gridContainer}
        classNameBottomLeftGrid={classes.gridContainer}
        classNameBottomRightGrid={classes.gridContainer}
      />

      {scrollLeft > 0 && (
        <div
          className={classes.fixedColumnShadow}
          style={{ left: fixedColumnWidth, height }}
        />
      )}

    </div>
  )

}


