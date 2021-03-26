import React from 'react'
import PropTypes from 'prop-types'

import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/core/Alert'


const AUTO_HIDE_DURATION = 3000

const SnackbarContext = React.createContext()


/**
 *
 * Message API
 *   message = {
 *     value: string
 *     type: 'info' | 'error' | 'warning' | 'success' = 'info'
 *     action: node = null
 *     autoHideDuration: number = AUTO_HIDE_DURATION
 *   }
 */
class SnackbarProvider extends React.Component {
  state = {
    messages: [],
    currentMessage: null,
    status: 'ready',
  }

  componentDidUpdate = () => {
    if (this.state.status === 'ready' && this.state.messages.length) {
      this.setState({
        currentMessage: this.state.messages[0],
        messages: this.state.messages.slice(1),
        status: 'live',
      })
    } else if (this.state.status === 'dead') {
      this.setState({ status: 'ready', currentMessage: null })
    }
  }

  addMessage = message => {
    // We need the callback version of setState to make sure that quick calls
    // to drop messages.
    this.setState(prevState => ({
      messages: prevState.messages.concat(message),
    })
    )
  }

  clearMessage = () =>
    this.setState({
      status: 'dead',
    })

  render = () => {
    const { children } = this.props
    const { currentMessage, status } = this.state

    return (
      <SnackbarContext.Provider
        value={{
          add: this.addMessage,
          clear: this.clearMessage,
        }}
      >
        {children}
        <Snackbar
          open={status === 'live'}
          autoHideDuration={currentMessage?.autoHideDuration || AUTO_HIDE_DURATION}
          onClose={this.clearMessage}
          onExited={() => this.setState({ status: 'ready' })}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: 'right',
          }}
        >
          <Alert
            onClose={this.clearMessage}
            severity={currentMessage?.type || 'info'}
            action={currentMessage?.action || ''}
          >
            {currentMessage?.value}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
    )
  }
}

const useSnackbar = () => React.useContext(SnackbarContext)

SnackbarProvider.propTypes = {
  /** Wrapped content of the provider */
  children: PropTypes.node,
}

export {
  SnackbarProvider,
  SnackbarContext,
  useSnackbar,
}
