import * as React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AutoSizeIcon from '@mui/icons-material/ExpandRounded'


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
