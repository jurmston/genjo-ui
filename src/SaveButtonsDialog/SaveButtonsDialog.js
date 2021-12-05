import React from 'react'
import PropTypes from 'prop-types'

import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import useDimensions from '../useDimensions'


export const SaveButtonsDialog = ({
  isIn = false,
  onCancel,
  onSave,
  children,
}) => {

  const [ref, dim] = useDimensions()

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: 120,
      }}
    >
      <Slide in={isIn} direction="up">
        <Box
          sx={{
            zIndex: 9999,
            position: 'fixed',
            bottom: 32,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 8,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            width: dim.width - 48,
            left: dim.left + 24,
          }}
        >
          {children ?? (
            <>
              <Button onClick={onCancel}>Discard Changes</Button>

              <div style={{ flex: 1 }} />

              <Button variant="contained" color="primary" onClick={onSave}>
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Slide>
    </Box>
  )
}

SaveButtonsDialog.propTypes = {
  isIn: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  children: PropTypes.node,
}

export default SaveButtonsDialog
