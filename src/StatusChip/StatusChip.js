import * as React from 'react'
import PropTypes from 'prop-types'

import Chip from '@mui/material/Chip'
import { useTheme, lighten, darken } from '@mui/material/styles'
import { colors } from '../ThemeProvider'

const PALETTE_SET = new Set(['primary', 'secondary', 'success', 'info', 'warning', 'error'])


export function StatusChip({ color = 'grey', ...chipProps }) {
  const isPaletteColor = PALETTE_SET.has(color)
  const theme = useTheme()

  const backgroundColor = isPaletteColor
    ? lighten(theme.palette[color].main, 0.5)
    : colors[color][100]

  const textColor = isPaletteColor
    ? darken(theme.palette[color].dark, 0.5)
    : darken(colors[color][900], 0.1)

  return (
    <Chip
      {...chipProps}
      sx={{
        fontWeight: 700,
        backgroundColor,
        color: textColor,
      }}
    />
  )
}

StatusChip.propTypes = {
  color: PropTypes.string,
}
