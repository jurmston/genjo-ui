import * as React from 'react'
import PropTypes from 'prop-types'
import { darken, useTheme } from '@mui/material/styles'

import MuiCheckbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { baseHighlight, createHighlight, highlightTransition } from '../ThemeProvider'


function CheckboxIcon({ indeterminate = false, color = 'primary', checked = false, ...props }) {
  const theme = useTheme()

  const paletteColor = color === 'default'
    ? theme.palette.grey[500]
    : theme.palette[color].main

  const isActive = checked || indeterminate

  return (
    <Box
      {...props}
      component="span"
      sx={{
        borderRadius: '3px',
        width: 17,
        height: 17,
        minWidth: 17,
        maxHeight: 17,
        boxShadow: baseHighlight,
        boxSizing: 'border-box',
        transition: highlightTransition,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: isActive
          ? paletteColor
          : '#f5f8fa'
        ,
        backgroundImage: isActive
          ? 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))'
          : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',

        '.Mui-focusVisible &': {
          boxShadow: createHighlight(theme.palette.primary.main),
        },
        'input:hover ~ &': {
          backgroundColor: isActive
            ? darken(paletteColor, 0.05)
            : '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
        '&:before': {
          transition: theme.transitions.create('transform'),
          transform: isActive ? 'scale(1)' : 'scale(0)',
          display: 'block',
          width: 17,
          height: 17,
          boxSizing: 'border-box',
          border: `1px solid transparent`,
          backgroundImage: indeterminate ? (
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 25 25'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z' " +
            "fill='%23fff'/%3E%3C/svg%3E\")"
          ) : (
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")"
          ),
          content: '""',
        },
      }}
    />
  )
}


export function Checkbox({ color, ...props }) {
  return (
    <MuiCheckbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },

      }}
      disableRipple
      indeterminateIcon={<CheckboxIcon indeterminate color={color} />}
      checkedIcon={<CheckboxIcon checked color={color} />}
      icon={<CheckboxIcon color={color} />}
      {...props}
    />
  )
}

CheckboxIcon.propTypes = {
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning',
  ]),
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
}

Checkbox.propTypes = {
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning',
  ]),
}

export default Checkbox
