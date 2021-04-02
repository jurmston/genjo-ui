import React from 'react'
import PropTypes from 'prop-types'
import { areEqual } from 'react-window'
import Checkbox from '@material-ui/core/Checkbox'
import Skeleton from '@material-ui/core/Skeleton'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { useTable } from '../context'


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
      width,
    } = useTable()

    const {
      align = 'left',
      value = <Typography>cellulaticular rapitious oligiosis noodles</Typography>,
      isLoading = false,
      isCheckbox = false,
    } = columnIndex === 0
      ?  { isCheckbox: true }
      : React.useMemo(
        () => getCellData(rowIndex, columnIndex - 1),
        [rowIndex, columnIndex]
      )

    const subtotalData = React.useMemo(
      () => getSubtotalData(rowIndex, columnIndex - 1),
      [rowIndex]
    )

    const { top, height } = subtotalData?.type === 'title'
      ? { top: style.top + rowHeight * 2, height: rowHeight }
      : subtotalData?.type === 'subtotals'
      ? { top: style.top, height: rowHeight }
      : { top: style.top, height: style.height }

    return (
      <>
        {subtotalData?.type === 'title' && columnIndex === 0 && (
          <div
            className={classes.subtotalTitle}
            style={{
              top: style.top + 0.5 * rowHeight,
              height: rowHeight * 1.5,
              left: style.left,
            }}
          >
            <div className={classes.subtotalTitleText}>
              <span>
                {subtotalData?.value || ''}
              </span>

              <span className={classes.countText}>
                {` (${subtotalData?.count} records)`}
              </span>
            </div>
          </div>
        )}

        <div
          className={clsx(classes.cell, {
            [classes.isSelected]: selectedCells.has(rowIndex),
            [classes.hoveredRowCell]: hoveredState[0] === rowIndex,
            [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
            [classes.isSubtotalTitle]: Boolean(subtotalData?.type === 'title'),
          })}
          style={{
            ...style,
            top,
            height,
            textAlign: align,
          }}
          onMouseOver={() => onHover(rowIndex, -1)}
        >
          {isCheckbox ? (
            <Checkbox
              checked={selectedCells.has(rowIndex)}
              onChange={event => toggleSelectRow(rowIndex)}
            />
          ) : isLoading
            ? <Skeleton variant="text" />
            : value
          }
        </div>

        {subtotalData?.type === 'subtotals' && (
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
          </div>
        )}
      </>
    )
  },

  // Check for memoization equality
  areEqual,
)

DataCell.propTypes = {

}

export { DataCell }
