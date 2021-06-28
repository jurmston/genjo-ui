import React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

import { colors } from '../ThemeProvider'


/**
 * Button for selecting the picker color.
 */
export function ColorPickerButton({
  checked,
  color = colors.blueGrey[500],
  onClick,
}) {
  const theme = useTheme()

  return (
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: color,
          color: theme.palette.white,
          margin: theme.spacing(0.5),
          minWidth: 22,
          minHeight: 22,
          '&:hover': {
            backgroundColor: alpha(color || '#fff', 0.5),
          },
        }}
      >
        {checked && <CheckIcon />}
      </IconButton>
  )
}

ColorPickerButton.propTypes = {
  /** If `true`, a check mark appears. */
  checked: PropTypes.bool,
  /** Color of the button. */
  color: PropTypes.string,
  /** Label of the button. */
  label: PropTypes.string,
  /**
   * Callback when button is clicked.
   */
  onClick: PropTypes.func,
}
