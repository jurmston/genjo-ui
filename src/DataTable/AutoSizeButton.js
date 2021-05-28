import * as React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AutoSizeIcon from '@material-ui/icons/ExpandRounded'


export const AutoSizeButton = React.memo(
  ({ autoSizeColumns }) => {

    return (
      <div>
        <Tooltip title="Auto-size columns">
          <IconButton onClick={autoSizeColumns}>
            <AutoSizeIcon className="GenjoDataTable__auto-size-icon" />
          </IconButton>
        </Tooltip>
      </div>
    )
  },
)

AutoSizeButton.displayName = 'AutoSizeButton'

AutoSizeButton.propTypes = {

}
