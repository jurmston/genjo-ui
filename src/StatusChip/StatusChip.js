import * as React from 'react'
import PropTypes from 'prop-types'

import Chip from '@material-ui/core/Chip'
import { colors } from '../ThemeProvider'

const PALETTE_SET = new Set(['primary', 'secondary', 'success', 'info', 'warning', 'error'])


export function StatusChip({ color = 'grey', ...chipProps }) {
  const isPaletteColor = PALETTE_SET.has(color)

  const backgroundColor = isPaletteColor
    ? `${color}.light`
    : colors[color][100]

  const textColor = isPaletteColor
    ? `${color}.contrastText`
    : colors[color][900]

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
