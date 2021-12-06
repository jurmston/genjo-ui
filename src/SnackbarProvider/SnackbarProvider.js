import React from 'react'
import PropTypes from 'prop-types'

import { v4 as uuid } from 'uuid'
import { useTheme } from '@mui/material/styles'
import { SnackbarContext } from './SnackbarContext'
import { SnackbarMessage } from './SnackbarMessage'
import Box from '@mui/material/Box'


export function SnackbarProvider({ maxMessages = 3, children, hPosition = 'left', vPosition = 'bottom' }) {
  const theme = useTheme()
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

  const positionProps = React.useMemo(
    () => hPosition === 'center'
      ? { left: '50%', transform: 'translateX(-50%)' }
      : { [hPosition]: 16 },
    [hPosition]
  )

  return (
    <SnackbarContext.Provider
      value={{
        addMessage,
        clearMessages,
        error: text => addMessage({ type: 'error', text }),
        warning: text => addMessage({ type: 'warning', text }),
        success: text => addMessage({ type: 'success', text }),
        info: text => addMessage({ type: 'info', text }),
      }}
    >
      {children}

      {messages.length > 0 && (
        <Box
          sx={{
            ...positionProps,
            position: 'fixed',
            [vPosition]: 16,
            display: 'flex',
            flexDirection: 'column-reverse',
            transitions: theme.transitions.create('height'),
            zIndex: 'snackbar',
          }}
        >
          {messages.slice(0, maxMessages).map((message, index) => (
            <SnackbarMessage
              {...message}
              key={message.id}
              direction={hPosition === 'left'
                ? 'right'
                : hPosition === 'right'
                ? 'left'
                : vPosition === 'top'
                ? 'down'
                : 'up'
              }
              kill={() => killMessage(message.id)}
              shouldMakeRoom={index === 0 && messages.length > maxMessages}
            />
          ))}
        </Box>
      )}
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.propTypes = {
  /** Wrapped content of the provider. */
  children: PropTypes.node,
  /** The maximum number of messages that can appear on the screen. */
  maxMessages: PropTypes.number,
  hPosition: PropTypes.oneOf(['left', 'right', 'center']),
  vPosition: PropTypes.oneOf(['top', 'bottom']),
}
