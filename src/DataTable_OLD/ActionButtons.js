import * as React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import useDataTable from './useDataTable'

export const ActionButtons = React.memo(
  ({ rowIndex }) => {
    const { actions, classes } = useDataTable()

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'nowrap',
        }}
      >
        {actions.map(action => (
          <IconButton
            key={action.title}
            className={classes.actionButton}
            onClick={event => {
              event.stopPropagation()
              action?.onClick(event, rowIndex)
            }}
          >
            {action?.icon}
          </IconButton>
        ))}

      </div>
    )
  }
)

ActionButtons.propTypes = {
  /** The index of the row. */
  rowIndex: PropTypes.number,
}

ActionButtons.displayName = 'ActionButtons'

export default ActionButtons
