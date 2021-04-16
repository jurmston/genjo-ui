import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Checkbox from '@material-ui/core/Checkbox'
import useDataTable from './useDataTable'


export const CheckboxHeader = React.memo(
  ({ style, status, onChange }) => {
    const { classes } = useDataTable()

    return (
      <div
        style={{
          ...style,
        }}
        className={clsx(
          classes.cell,
          classes.headerCell,
        )}
      >
        <Checkbox
          checked={status === 'checked'}
          indeterminate={status === 'indeterminate'}
          onChange={onChange}
        />
      </div>
    )
  }
)

CheckboxHeader.propTypes = {
  style: PropTypes.object,
  status: PropTypes.oneOf(['empty', 'checked', 'indeterminate']),
  onChange: PropTypes.func,
}

CheckboxHeader.displayName = 'CheckboxHeader'

export default CheckboxHeader
