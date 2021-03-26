import React from 'react'
import PropTypes from 'prop-types'

// MAterial UI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// App
import { CircleLoader } from '../../components/CircleLoader/CircleLoader'


const LoaderContext = React.createContext()


const LoaderProvider = ({ children }) => {
  const [message, setMessage] = React.useState('')

  const clear = () => setMessage('')

  return (
    <LoaderContext.Provider
      value={{
        message,
        setMessage,
        clear,
      }}
    >
      {children}
      <Dialog
        disableEscapeKeyDown
        open={Boolean(message)}
        TransitionProps={{
          mountOnEnter: true,
          unmountOnExit: true,
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

const useLoader = () => React.useContext(LoaderContext)

LoaderProvider.propTypes = {
  children: PropTypes.node,
}

export {
  LoaderContext,
  LoaderProvider,
  useLoader,
}
