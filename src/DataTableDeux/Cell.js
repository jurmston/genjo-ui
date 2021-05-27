import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { areEqual } from 'react-window'

import Checkbox from '../Checkbox'
import Skeleton from '@material-ui/core/Skeleton'

import renderCell from '../DataTable/utils/renderCell'

import { useDataTable } from './DataTableDeux'


export const Cell = React.memo(
  ({ width, rowIndex, columnIndex, value }) => {

    function onRowClick() {}

    const { customRenderers, columns } = useDataTable()

    const {
      type,
      totalType,
      dataKey,
      align,
    } =  columns[columnIndex]

    const cellContent = value === undefined ? (
      <Skeleton variant="text" />
    ) : (
      <span>
        {customRenderers?.[type]
          ? customRenderers[type](value)
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
