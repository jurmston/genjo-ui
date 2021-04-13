import React from 'react'
import PropTypes from 'prop-types'
import { areEqual } from 'react-window'
import Checkbox from '@material-ui/core/Checkbox'
import Skeleton from '@material-ui/core/Skeleton'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useDataTable from '../useDataTable'

import SubtotalTitleRow from './SubtotalTitleRow'
import SubtotalCell from './SubtotalCell'

import renderCell from '../utils/renderCell'
import getCellAlignment from '../utils/getCellAlignment'


const DataCell = React.memo(
  ({ columnIndex, rowIndex, style }) => {

    const {
      classes,
      columns,
      getCellData,
      onHover,
      hoveredState,
      selectedCells,
      toggleSelectRow,
      getSubtotalData,
      rowHeight,
      onRowClick,
    } = useDataTable()

    // const {
    //   align = 'left',
    //   value = <Typography>cellulaticular rapitious oligiosis noodles</Typography>,
    //   isLoading = false,
    //   isCheckbox = false,
    // } = columnIndex === 0
    //   ?  { isCheckbox: true }
    //   : React.useMemo(
    //     () => getCellData(rowIndex, columnIndex - 1),
    //     [rowIndex, columnIndex]
    //   )

    const type = columnIndex === 0
      ? 'checkbox'
      : columns[columnIndex - 1]?.type

    const value = React.useMemo(
      () => columnIndex === 0
        ? null
        : getCellData(rowIndex, columnIndex - 1),
      [rowIndex, columnIndex]
    )

    const align = columnIndex === 0
      ? 'center'
      : columns[columnIndex - 1]?.align


    const subtotalData = React.useMemo(
      () => getSubtotalData(rowIndex, columnIndex - 1),
      [rowIndex]
    )

    // Calculate the cell top and height if subtotals are enabled.
    const { top, height } = subtotalData?.type === 'title'
      ? { top: style.top + rowHeight * 2, height: rowHeight }
      : subtotalData?.type === 'subtotals'
      ? { top: style.top, height: rowHeight }
      : { top: style.top, height: style.height }

    const cellContent = type === 'checkbox' ? (
      <Checkbox
        checked={selectedCells.has(rowIndex)}
        onChange={() => toggleSelectRow(rowIndex)}
        onClick={event => {
          // Prevent propagation to `onRowClick` event.
          event.stopPropagation()
        }}
      />
    ) : value === undefined ? (
      <Skeleton variant="text" />
    ) : (
      <span>
        {renderCell(type, value)}
      </span>
    )

    function handleClick(event) {
      onRowClick?.(event, rowIndex)
    }

    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        onRowClick?.(event, rowIndex)
      }
    }

    return (
      <>
        {subtotalData?.type === 'title' && columnIndex === 0 && (
          <SubtotalTitleRow
            value={subtotalData?.value}
            count={subtotalData?.count}
            top={style.top}
            left={style.left}
          />
        )}

        <div
          role="button"
          tabIndex={0}
          className={clsx(classes.cell, {
            [classes.isSelected]: selectedCells.has(rowIndex),
            [classes.hoveredRowCell]: hoveredState[0] === rowIndex,
            [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
            [classes.isSubtotalTitle]: Boolean(subtotalData?.type === 'title'),
            [classes.isClickable]: Boolean(onRowClick),
          })}
          style={{
            ...style,
            top,
            height,
            textAlign: align,
          }}
          onMouseOver={() => onHover(rowIndex, -1)}
          onFocus={() => onHover(rowIndex, -1)}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          {cellContent}
        </div>

        {subtotalData?.type === 'subtotals' && (
          <SubtotalCell
            columnIndex={columnIndex}
            type={subtotalData?.type}
            value={subtotalData?.value}
            alignment={alignment}
            style={style}
          />
          /*
          <div
            className={clsx(classes.cell, classes.subtotalCell, {
              [classes.isFirst]: columnIndex === 0,
              [classes.isLast]: columnIndex === columns.length,
            })}
            style={{
              ...style,
              textAlign: subtotalData?.align,
              top: top + rowHeight,
              height: rowHeight,
            }}
          >
            {subtotalData?.value || ''}
          </div>*/
        )}
      </>
    )
  },

  // Check for memoization equality
  areEqual,
)

DataCell.propTypes = {
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  style: PropTypes.object,
}

DataCell.displayName = 'DataCell'

export { DataCell }
