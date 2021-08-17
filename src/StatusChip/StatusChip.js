import * as React from 'react'
import PropTypes from 'prop-types'

import Chip from '@material-ui/core/Chip'


export function StatusChip({ color = 'grey', ...chipProps }) {

  return (
    <Chip
      {...chipProps}
      sx={{
        fontWeight: 700,
        backgroundColor: `${color}.light`,
        color: `${color}.dark`,
      }}
    />
  )
}

StatusChip.propTypes = {

}
