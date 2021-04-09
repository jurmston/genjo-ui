import * as React from 'react'
import SnackbarContext from './SnackbarContext'

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext)

  if (context === undefined) {
    throw new Error('useSnackbar must be within a SnackbarProivider')
  }

  return context
}

export default useSnackbar
