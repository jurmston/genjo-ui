import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CircleLoader from '../CircleLoader'
import LoaderContext from './LoaderContext'

export const LoaderProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const close = React.useCallback(() => setIsOpen(false), [])

  const open = React.useCallback(messageValue => {
    setMessage(messageValue)
    setIsOpen(true)
  }, [])

  const clearMessage = React.useCallback(() => {
    if (!isOpen) {
      setMessage('')
    }
  }, [isOpen])

  return (
    <LoaderContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
      <Dialog
        fullWidth={false}
        disableEscapeKeyDown
        open={isOpen}
        TransitionProps={{
          mountOnEnter: true,
          unmountOnExit: true,
          onExited: clearMessage,
        }}
      >
        <DialogContent>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <CircleLoader size={64} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                {message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </LoaderContext.Provider>
  )
}

LoaderProvider.propTypes = {
  children: PropTypes.node,
}

export default LoaderProvider
