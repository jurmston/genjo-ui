import * as React from 'react'
import PropTypes from 'prop-types'

import useDataTable from './useDataTable'

export const SubtotalTitleRow = ({ value = '', count = 0, top = 0, left = 0 }) => {
  const { classes, rowHeight } = useDataTable()

  return (
    <div
      className={classes.subtotalTitle}
      style={{
        top: top,
        height: rowHeight,
        left: left,
      }}
    >
      <div className={classes.subtotalTitleText}>
        <span>
          {value || ''}
        </span>

        <span className={classes.countText}>
          {` (${count} records)`}
        </span>
      </div>
    </div>
  )
}

SubtotalTitleRow.propTypes = {
  value: PropTypes.string,
  count: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
}

export default SubtotalTitleRow
