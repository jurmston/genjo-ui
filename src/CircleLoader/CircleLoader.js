import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'


export function CircleLoader(props) {
  const theme = useTheme()
  const { className, size = 40, ...restProps } = props

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700],
        }}
        variant="determinate"
        size={size}
        thickness={4}
        {...restProps}
        value={100}
      />
      <CircularProgress
        sx={{
          color: theme.palette.primary.main,
          animationDuration: '1200ms',
          position: 'absolute',
          left: 0,

          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
        variant="indeterminate"
        disableShrink
        size={size}
        thickness={4}
        {...restProps}
      />
    </div>
  )
}

CircleLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
}

export default CircleLoader
