import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { ClosableDialogTitle } from '../ClosableDialogTitle/ClosableDialogTitle'


const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Discard Changes',
  message = '',
  cancelText = 'Cancel',
  confirmText = 'Yes, do it',
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <ClosableDialogTitle onClose={onClose}>{title}</ClosableDialogTitle>
      {Boolean(message) && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose}>
          {cancelText}
        </Button>

        <Button onClick={onConfirm} color="primary" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
}

export { ConfirmationDialog }