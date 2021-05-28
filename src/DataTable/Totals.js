import * as React from 'react'
import PropTypes from 'prop-types'

import { TotalCell } from './TotalCell'

const HEADER_HEIGHT = 48
const ROW_HEIGHT = 36
const ACTIONS_WIDTH = 100
const TOTALS_HEIGHT = 56


export const Totals = React.memo(
  ({ columns, totals }) => {
    return (
      <div className="GenjoDataTable__totals" style={{ height: TOTALS_HEIGHT }}>
        <div
          className="GenjoDataTable__cell"
          style={{ width: ROW_HEIGHT, maxWidth: ROW_HEIGHT, minWidth: ROW_HEIGHT }}
        />

        {columns.map((column, index) => totals?.[column.dataKey] ? (
          <TotalCell
            key={column.dataKey}
            {...totals[column.dataKey]}
            column={column}
          />
        ) : (
          <div
            key={column.dataKey}
            className="GenjoDataTable__cell"
            style={{ width: column.width, maxWidth: column.width, minWidth: column.width }}
          />
        ))}

      </div>
    )
  },
)

Totals.displayName = 'Totals'

Totals.propTypes = {

}
