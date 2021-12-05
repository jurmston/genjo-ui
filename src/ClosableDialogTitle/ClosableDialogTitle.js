import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'


/**
 * A dyanmic content panel that opens on the right side of the viewport.
 */
export function ClosableDialogTitle({ children, onClose, ...other }) {
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        position: 'relative',
        ...other.sx
      }}
      {...other}
    >
      <Typography variant="h3" component="div">
        {children}
      </Typography>
      {onClose ? (
        <Box
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : null}
    </DialogTitle>
  )
}

ClosableDialogTitle.propTypes = {
  /** The content of the ClosableDialogTitle. */
  children: PropTypes.node.isRequired,
  /**
   * Callback for closing the ClosableDialogTitle.
   *
   * @param {object} event Source event for the onClick callback.
   */
  onClose: PropTypes.func.isRequired,
}
