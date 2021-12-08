import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'


/* From
https://codepen.io/danielmorosan/pen/XmYBVx
Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */

/**
 * Loading component to display on non full page content
 */
export function MiniLoader({ width = 40, color = 'grey.500', ...props }) {

  return (
    <Box
      sx={{
        width,
        height: width * 0.8,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        '& div': {
          width: width * 0.25,
          height: width * 0.25,
          margin: 'auto 0',
          borderRadius: '100%',
          display: 'inline-block',
          animation: 'sk-bouncedelay 1.4s infinite ease-in-out both',
          '&:not(:first-of-type):not(:last-of-type)': {
            animationDelay: '-0.16s',
          },
          '&:first-of-type': {
            animationDelay: '-0.32s',
          },
        },

        '@keyframes sk-bouncedelay': {
          '0%, 80%, 100%': {
            transform: 'scale(0)',
          },
          '40%': {
            transform: 'scale(1.0)',
          },
        },
      }}
      {...props}
    >
      <Box sx={{ bgcolor: color }} />
      <Box sx={{ bgcolor: color }} />
      <Box sx={{ bgcolor: color }} />
    </Box>
  )
}

MiniLoader.propTypes = {
  /** The width of the container. */
  width: PropTypes.number,
  /** Color variant of the loader. */
  color: PropTypes.string,
}
