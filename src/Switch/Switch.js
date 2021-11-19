import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'

import MuiSwitch from '@mui/material/Switch'


export function Switch({ color = 'primary', ...props }) {
  const theme = useTheme()

  const paletteColor = color === 'default'
    ? theme.palette.grey[500]
    : theme.palette[color].main

  return (
    <MuiSwitch
      {...props}
      sx={{
        width: 28,
        height: 16,
        padding: 0,
        margin: 1,
        display: 'flex',
        '&:hover': {
          '& .MuiSwitch-track': {
            backgroundColor: '#ebf1f5',
          }
        },

        '& .MuiSwitch-switchBase': {
          padding: '2px',
          color: theme.palette.common.white,
          border: 'none',
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: paletteColor,
              backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            },
            '& .MuiSwitch-thumb': {
              borderColor: paletteColor,
            }
          },
        },

        '& .MuiSwitch-thumb': {
          width: 14,
          height: 14,
          marginTop: '-1px',
          marginLeft: '-1px',
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          '&.Mui-checked': {
            borderColor: paletteColor,
          }
        },

        '& .MuiSwitch-track': {
          // border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 1,
          opacity: 1,
          boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
          backgroundColor: '#e8ecee',
          backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        },
      }}
    />
  )
}

Switch.propTypes = {
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning',
  ]),
}

export default Switch
