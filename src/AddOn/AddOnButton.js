import * as React from 'react'
import PropTypes from 'prop-types'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import { highlightTransition, createHighlightSx,  } from '../ThemeProvider'
import { AddOn } from './AddOn'


export function AddOnButton({ sx, color = 'grey', ...props }) {
  const theme = useTheme()

  return (
    <AddOn
      {...props}
      component={ButtonBase}
      disableRipple
      disableTouchRipple
      sx={{
        transition: highlightTransition,
        fontWeight: 700,
        backgroundColor: theme.palette[color][100],

        ...createHighlightSx(theme.palette.primary.main, '4px'),

        '&:hover': {
          backgroundColor: theme.palette[color][200],
        },

        '&:active': {
          backgroundColor: theme.palette[color][300],
        },
        ...sx,
      }}
    />
  )
}

AddOnButton.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.string,
}
