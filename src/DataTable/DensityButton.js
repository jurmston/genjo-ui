import * as React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import CollapseIcon from '@material-ui/icons/UnfoldLessRounded'
import ExpandIcon from '@material-ui/icons/UnfoldMoreRounded'


export const DensityButton = React.memo(
  ({ setRowDensity, rowDensity }) => {

    function handleClick() {
      setRowDensity(rowDensity === 'dense' ? 'sparse' : 'dense')
    }

    return (
      <div>
        <Tooltip title={rowDensity === 'dense' ? 'Expand rows' : 'Shrink rows'}>
          <IconButton onClick={handleClick}>
            {rowDensity === 'dense'
              ? <ExpandIcon />
              : <CollapseIcon />
            }
          </IconButton>
        </Tooltip>
      </div>
    )
  },
)

DensityButton.displayName = 'DensityButton'

DensityButton.propTypes = {

}
