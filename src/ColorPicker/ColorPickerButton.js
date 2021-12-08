import React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import CheckIcon from '@mui/icons-material/Check'

import { shadows } from '../ThemeProvider'


/**
 * Button for selecting the picker color.
 */
export function ColorPickerButton({
  color,
  onClick,
  changeDisplayColor,
}) {
  const theme = useTheme()

  return (
      <IconButton
        onClick={onClick}
        onMouseEnter={() => changeDisplayColor?.(color)}
        onMouseLeave={() => changeDisplayColor?.('')}
        sx={{
          backgroundColor: color,
          color: theme.palette.white,
          boxShadow: shadows[2],
          minWidth: 28,
          minHeight: 28,
          '&:hover': {
            backgroundColor: alpha(color || '#fff', 0.5),
          },
        }}
      />
  )
}

ColorPickerButton.propTypes = {
  /** Color of the button. */
  color: PropTypes.string,
  /** Label of the button. */
  label: PropTypes.string,
  /**
   * Callback when button is clicked.
   */
  onClick: PropTypes.func,
}
