import * as React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import { useTextEditor } from './useTextEditor'


export function EditorBox({ children }) {
  const { handleFocus, readOnly, variant } = useTextEditor()

  return (
    <Box
      onClick={handleFocus}
      onKeyPress={handleFocus}
      role="textbox"
      tabIndex={0}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        border: readOnly || variant !== 'contained' ? 'none' : 1,
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.default',
        outline: 'none',
      }}
    >
      {children}
    </Box>
  )
}

EditorBox.propTypes = {
  children: PropTypes.node,
}
