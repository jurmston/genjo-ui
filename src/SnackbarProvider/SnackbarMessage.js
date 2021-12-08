import * as React from 'react'
import PropTypes from 'prop-types'

import Slide from '@mui/material/Slide'
import Grow from '@mui/material/Grow'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'

const MAX_DURATION = 8000
const MIN_DURATION = 3000
const MS_PER_CHARACTER = 65

/**
 * Calculates the length of time in milliseconds a snackbar message will
 * appear based on the length of the text.
 *
 * @param {string} text The text value of the message
 * @returns {number} Duration the message will appear in milliseconds
 */
function getMessageDuration(text = '') {
  return Math.max(Math.min(text.length * MS_PER_CHARACTER, MAX_DURATION), MIN_DURATION)
}

export function SnackbarMessage({ text, type, kill, shouldMakeRoom, direction = 'right' }) {
  const [isOnScreen, setIsOnScreen] = React.useState(true)
  const [isFullHeight, setIsFullHeight] = React.useState(true)

  // On mount, start a timeout for the calculated duration of the message.
  React.useEffect(() => {
    const interval = setTimeout(() => {
      setIsOnScreen(false)
    }, getMessageDuration(text))

    return () => clearTimeout(interval)
  }, [])

  const TransitionComponent = direction === 'up' || direction === 'down'
    ? Grow
    : Slide

  const directionProp = direction === 'up' || direction === 'down'
    ? {}
    : { direction }

  return (
    <Collapse in={isFullHeight} onExited={() => kill()}>
      <TransitionComponent in={isOnScreen && !shouldMakeRoom} {...directionProp} onExited={() => setIsFullHeight(false)}>
        <Alert
          sx={{ mt: 1, maxWidth: 300, boxShadow: 8 }}
          onClose={() => setIsOnScreen(false)}
          severity={type}
          variant="filled"
        >
          {text}
        </Alert>
      </TransitionComponent>
    </Collapse>
  )
}

SnackbarMessage.propTypes = {
  /** The text value of the message. */
  text: PropTypes.string,
  /** The message type. */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /** Callack to remove the message from the message queue. */
  kill: PropTypes.func,
  /**
   * If `true`, `isOnScreen` will be set to false and start the removal of the
   * message.
   */
  shouldMakeRoom: PropTypes.bool,
}
