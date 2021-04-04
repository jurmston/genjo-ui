import * as React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'

import { useTextEditor } from './context'


export const ActionButton = ({
  isActive,
  icon: IconComponent,
  label,
  onMouseDown,
}) => {
  const { classes } = useTextEditor()

  return (
    <IconButton
      className={classes.actionButton}
      color={isActive ? 'primary' : 'default'}
      aria-label={label}
      onMouseDown={onMouseDown}
    >
      <IconComponent className={classes.actionButtonIcon} />
    </IconButton>
  )
}

ActionButton.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.func,
  label: PropTypes.string,
}
