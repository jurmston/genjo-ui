import React from 'react'
import PropTypes from 'prop-types'

import { v4 as uuid } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import SnackbarContext from './SnackbarContext'
import { SnackbarMessage } from './SnackbarMessage'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    left: 16,
    bottom: 16,
    display: 'flex',
    flexDirection: 'column-reverse',
    transitions: theme.transitions.create('height'),
  },
}))

const SnackbarProvider = ({ maxMessages = 3, children }) => {
  const classes = useStyles()

  const [messages, setMessages] = React.useState([])
  const [reaper, setReaper] = React.useState(new Set())

  function addMessage({ type, text }) {
    const newMessages = messages.concat({ type, text, id: uuid() })
    setMessages(newMessages)
  }

  function clearMessages() {
    const newReaper = new Set(reaper)
    messages.forEach(message => newReaper.add(message.id))
    setReaper(newReaper)
  }

  function killMessage(idToKill) {
    const newReaper = new Set([...reaper, idToKill])
    setReaper(newReaper)
  }

  // Clean up dead messages.
  React.useEffect(() => {
    if (reaper.size) {
      const filteredMessages = messages.filter(message => !reaper.has(message.id))
      setMessages(filteredMessages)
      setReaper(new Set())
    }
  }, [reaper, messages])

  return (
    <SnackbarContext.Provider
      value={{
        addMessage,
        clearMessages,
      }}
    >
      {children}

      {messages.length > 0 && (
        <div className={classes.container}>
          {messages.slice(0, maxMessages).map((message, index) => (
            <SnackbarMessage
              {...message}
              key={message.id}
              kill={() => killMessage(message.id)}
              shouldMakeRoom={index === 0 && messages.length > maxMessages}
            />
          ))}
        </div>
      )}
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.propTypes = {
  /** Wrapped content of the provider. */
  children: PropTypes.node,
  /** The maximum number of messages that can appear on the screen. */
  maxMessages: PropTypes.number,
}

export default SnackbarProvider
