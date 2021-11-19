import * as React from 'react'
import PropTypes from 'prop-types'
import { darken, useTheme } from '@mui/material/styles'
import MuiRadio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import { highlightTransition, createHighlight, baseHighlight } from '../ThemeProvider'


function RadioIcon({ color = 'primary', checked = false, ...props }) {
  const theme = useTheme()

  const paletteColor = color === 'default'
    ? theme.palette.grey[500]
    : theme.palette[color].main

  return (
    <Box
      {...props}
      component="span"
      sx={{
        borderRadius: '50%',
        width: 17,
        height: 17,
        minWidth: 17,
        maxHeight: 17,
        boxShadow: baseHighlight,
        boxSizing: 'border-box',
        transition: highlightTransition,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: checked
          ? paletteColor
          : '#f5f8fa'
        ,
        backgroundImage: checked
          ? 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))'
          : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',

        '.Mui-focusVisible &': {
          boxShadow: createHighlight(theme.palette.primary.main),
        },
        'input:hover ~ &': {
          backgroundColor: checked
            ? darken(paletteColor, 0.05)
            : '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
        '&:before': {
          transition: theme.transitions.create('transform'),
          transform: checked ? 'scale(1)' : 'scale(0)',
          display: 'block',
          width: 15,
          height: 15,
          backgroundImage: 'radial-gradient(#fff,#fff 35%,transparent 40%)',
          content: '""',
        },
      }}
    />
  )
}


export function Radio({ color, ...props }) {
  return (
    <MuiRadio
      {...props}
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      checkedIcon={<RadioIcon checked color={color}/>}
      icon={<RadioIcon color={color} />}
    />
  )
}

RadioIcon.propTypes = {
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning',
  ]),
  checked: PropTypes.bool,
}

Radio.propTypes = {
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'success', 'error', 'info', 'warning',
  ]),
}

export default Radio
