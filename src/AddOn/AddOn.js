import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import { colors } from '../ThemeProvider'


export const AddOn = React.forwardRef(function AddOn(props, ref) {
  const {
    position,
    ...rest
  } = props

  const isEnd = position === 'end'
  const isStart = position === 'start'

  return (
    <Box
      {...rest}
      ref={ref}
      sx={{
        borderRadius: 0,
        alignSelf: 'stretch',
        fontWeight: 700,
        backgroundColor: colors.grey[100],
        border: 0,
        borderColor: colors.grey[300],
        borderStyle: 'solid',
        margin: 0,
        py: 0,
        px: 1,
        minWidth: 0,
        flex: '1 0 auto',
        display: 'inline-flex',
        alignItems: 'center',

        borderTopRightRadius: isEnd ? 4 : 0,
        borderBottomRightRadius: isEnd ? 4 : 0,
        borderLeftWidth: isEnd ? 1 : 0,

        borderTopLeftRadius: isStart ? 4 : 0,
        borderBottomLeftRadius: isStart ? 4 : 0,
        borderRightWidth: isStart ? 1 : 0,

        ...rest.sx,
      }}
    />
  )
})

AddOn.propTypes = {
  position: PropTypes.oneOf(['start', 'end']),
}
