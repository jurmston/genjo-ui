import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { ClosableDialogTitle } from '../ClosableDialogTitle/ClosableDialogTitle'

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Discard Changes',
  message = '',
  cancelText = 'Cancel',
  confirmText = 'Yes, do it',
  children,
}) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <ClosableDialogTitle onClose={onClose}>{title}</ClosableDialogTitle>
      {Boolean(message) && (
        <DialogContent>
          {Boolean(message) && (
            <DialogContentText>{message}</DialogContentText>
          )}
        </DialogContent>
      )}

      {children}

      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>

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
  children: PropTypes.node,
}

export default ConfirmationDialog
