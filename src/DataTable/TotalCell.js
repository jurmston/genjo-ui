import React from 'react'
import PropTypes from 'prop-types'
import { areEqual } from 'react-window'
import clsx from 'clsx'
import useDataTable from './useDataTable'
import renderCell from './utils/renderCell'


export const TotalCell = React.memo(
  ({ columnIndex, style, data }) => {

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

    const { align, dataKey } = columns[columnIndex]
    const isLast = columnIndex === columns.length
    const { type, value, label } = data?.[dataKey] ?? {}

    return (
      <div
        className={clsx(classes.cell, classes.totalCell, {
          [classes.isLast]: isLast,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
          [classes.hasContent]: Boolean(label),
        })}
        style={{
          ...style,
          textAlign: align,
        }}
        onMouseOver={() => onHover(-1, columnIndex)}
        onFocus={() => onHover(-1, columnIndex)}
      >
        <span className={classes.totalLabel}>{label}</span>
        <span>{renderCell(type, value)}</span>
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

export default TotalCell
