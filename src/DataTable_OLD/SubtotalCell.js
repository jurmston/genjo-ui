import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import useDataTable from './useDataTable'
import renderCell from './utils/renderCell'


function areEqual(prevProps, nextProps) {
  return prevProps.type === nextProps.type
    && prevProps.value === nextProps.value
}


export const SubtotalCell = React.memo(
  ({ type, value, style, alignment = 'left' }) => {
    const { classes, rowHeight } = useDataTable()

    return (
      <div
        className={clsx(classes.cell, classes.subtotalCell)}
        style={{
          ...style,
          textAlign: alignment,
          top: style.top + rowHeight,
          height: rowHeight,
        }}
      >
        <span>
          {renderCell(type, value)}
        </span>
      </div>
    )
  },
  areEqual,
)

SubtotalCell.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
  columnIndex: PropTypes.number,
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
}

SubtotalCell.displayName = 'SubtotalCell'

export default SubtotalCell
