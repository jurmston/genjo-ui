import React from 'react'
import PropTypes from 'prop-types'
import { areEqual } from 'react-window'
import clsx from 'clsx'
import useDataTable from '../useDataTable'
import renderCell from '../utils/renderCell'


const TotalCell = React.memo(
  ({ columnIndex, style }) => {

    const {
      classes,
      columns,
      onHover,
      hoveredState,
    } = useDataTable()

    // Render a placeholder cell if `columnIndex === 0`, i.e. the checkbox
    // column.
    if (columnIndex === 0) {
      return (
        <div
          className={clsx(classes.totalCell, classes.isFirst)}
          style={style}
          onMouseOver={() => onHover(-1, columnIndex)}
          onFocus={() => onHover(-1, columnIndex)}
        />
      )
    }

    const { align, totalType, totalValue, totalLabel } = columns[columnIndex - 1]
    const isLast = columnIndex === columns.length

    return (
      <div
        className={clsx(classes.cell, classes.totalCell, {
          [classes.isLast]: isLast,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
          [classes.hasContent]: Boolean(totalLabel),
        })}
        style={style}
        onMouseOver={() => onHover(-1, columnIndex)}
        onFocus={() => onHover(-1, columnIndex)}
      >
        <div style={{ textAlign: align }}>
          <div className={classes.totalLabel}>{totalLabel}</div>
          <span>{renderCell(totalType, totalValue)}</span>
        </div>
      </div>
    )
  },

  //
  areEqual,
)

TotalCell.propTypes = {
  columnIndex: PropTypes.number,
  style: PropTypes.object,
}

TotalCell.displayName = 'TotalCell'

export { TotalCell }
