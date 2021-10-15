import React from 'react'
import Button from '@mui/material/Button'
import { ConfirmationDialog } from './ConfirmationDialog'

export default {
  title: 'Widgets/ConfirmationDialog',
  component: ConfirmationDialog,
}

export const Main = ({ title, message, cancelText, confirmText }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <ConfirmationDialog
        isOpen={isOpen}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOPen(false)}
      />
    </>
  )
}

Main.args = {
  title: 'Confirm Delete?',
  message: 'Deleting this item will permanently remove it from the system.',
  confirmText: 'Yes, Delete',
  cancelText: 'Cancel',
}
