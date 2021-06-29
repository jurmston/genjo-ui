import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/core/Skeleton'


import renderCell from './utils/renderCell'
import { useDataTable } from './useDataTable'


export const Cell = React.memo(
  ({ width, rowIndex, columnIndex, value, row }) => {

    const { customRenderers, columns } = useDataTable()

    const {
      type,
      align,
    } =  columns[columnIndex]

    const cellContent = value === undefined ? (
      <Skeleton variant="text" />
    ) : (
      <span>
        {customRenderers?.[type]
          ? customRenderers[type](rowIndex, row)
          : renderCell(type, value)
        }
      </span>
    )

    return (
      <div
        role="cell"
        className="GenjoDataTable__cell"
        style={{
          textAlign: align,
          width: width,
          maxWidth: width,
          minWidth: width,
        }}
      >
        {cellContent}
      </div>
    )
  },
)

Cell.propTypes = {
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.object,
}

Cell.displayName = 'Cell'

export default Cell
