import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import useDataTable from '../useDataTable'
import renderCell from '../utils/renderCell'


export const SubtotalCell = ({ type, value, style, columnIndex, alignment = 'left', }) => {
  const { classes, rowHeight, columns } = useDataTable()

  return (
    <div
      className={clsx(classes.cell, classes.subtotalCell, {
        [classes.isFirst]: columnIndex === 0,
        [classes.isLast]: columnIndex === columns.length,
      })}
      style={{
        ...style,
        textAlign: alignment,
        top: top + rowHeight,
        height: rowHeight,
      }}
    >
      <span>
        {renderCell(type, value)}
      </span>
    </div>
  )
}

SubtotalCell.propTypes = {

}

export default SubtotalCell
