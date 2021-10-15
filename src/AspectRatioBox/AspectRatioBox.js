import * as React from 'react'
import PropTypes from 'prop-types'
import { safeDivide } from '../utils/math'
import Box from '@mui/material/Box'


/**
 * Div container with a fixed aspect ratio.
 */
export function AspectRatioBox({ children, aspectRatio = 1, ...rest }) {

  const paddingTop = React.useMemo(
    () => {
      const inverseAspectRatio = safeDivide(1, aspectRatio)
      return `${inverseAspectRatio * 100}%`
    },
    [aspectRatio]
  )

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: 0,
        paddingTop,
      }}
    >
      <Box
        {...rest}
        sx={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          ...rest.sx,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

AspectRatioBox.propTypes = {
  /** Decimal value of the width by height. E.g. 16/9 */
  aspectRatio: PropTypes.number,
  /** Content of the div. */
  children: PropTypes.node,
}
