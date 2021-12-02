import * as React from 'react'
import PropTypes from 'prop-types'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import { baseHighlight, highlightTransition, createHighlight } from '../ThemeProvider'
import { AddOn } from './AddOn'


export function AddOnButton({ sx, ...props }) {
  const theme = useTheme()

  return (
    <AddOn
      {...props}
      component={ButtonBase}
      disableRipple
      disableTouchRipple
      sx={{
        boxShadow: baseHighlight,
        transition: highlightTransition,
        fontWeight: 700,

        '&:focus': {
          boxShadow: createHighlight(theme.palette.primary.main),
        },

        '&:hover': {
          backgroundColor: theme.palette.grey[200],
        },

        '&:active': {
          backgroundColor: theme.palette.grey[300],
        },
        ...sx,
      }}
    />
  )
}

AddOnButton.propTypes = {
  sx: PropTypes.object,
}
