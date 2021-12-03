import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import { AddOnButton } from '../AddOn'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import useDebounce from '../useDebounce'



const isTooShort = (password, minLength) => password.length < minLength


export function PasswordField({
  value = '',
  shouldDetectCapsLock = true,
  scoreMessages = ['Bad', 'Weak', 'Okay', 'Good', '👍 Strong'],
  tooShortMessage = 'Too Short',
  minLength = 8,
  detectPasswordStrength = false,
  userInputs = [],
  minScore = 2,
  error = false,
  onPasswordChange,
  onValidityChange,
  ...textFieldProps
}) {
  const [state, setState] = React.useState({
    passwordIsVisible: false,
    capsLockOn: false,
    score: 0,
    isValid: false,
    validatorIsLoaded: false,
  })

  const validatorRef = React.useRef()

  // Lazy-load zxcvbn
  React.useEffect(
    () => {
      let isMounted = true

      ;(async () => {
        const validator = (await import('zxcvbn')).default
        validatorRef.current = validator

        if (isMounted) {
          setState(s => ({ ...s, validatorIsLoaded: true }))
        }
      })()

      return () => isMounted = false
    },
    []
  )

  // Add Caps-lock detection
  React.useEffect(
    () => {
      if (!shouldDetectCapsLock) {
        return
      }

      function handleDetectCapsLocks(event) {
        if (!event?.getModifierState) {
          return
        }

        const capsLockOn = event.getModifierState('CapsLock')

        if (capsLockOn !== state.capsLockOn) {
          setState(s => ({ ...s, capsLockOn }))
        }
      }

      window.addEventListener('keydown', handleDetectCapsLocks)
      window.addEventListener('keyup', handleDetectCapsLocks)

      return () => {
        window.removeEventListener('keydown', handleDetectCapsLocks)
        window.removeEventListener('keyup', handleDetectCapsLocks)
      }
    },
    [shouldDetectCapsLock, state.capsLockOn]
  )

  // Validate the password on changes
  const debouncedPassword = useDebounce(value, 100)

  React.useEffect(
    () => {
      if (state.validatorIsLoaded && detectPasswordStrength && validatorRef.current) {
        let score = 0

        if (!isTooShort(debouncedPassword, minLength)) {
          const result = validatorRef.current(debouncedPassword, userInputs)
          score = result.score
        }

        const isValid = score >= minScore

        setState(s => ({
          ...s,
          isValid,
          score,
        }))
      }
    },
    [debouncedPassword, state.validatorIsLoaded, detectPasswordStrength]
  )


  // Respond to changes in the validity
  React.useEffect(
    () => {
      if (detectPasswordStrength) {
        onValidityChange?.(state.isValid)
      }
    },
    [state.isValid, onValidityChange, detectPasswordStrength]
  )

  const toggleVisibility = React.useCallback(
    () => setState(s => ({ ...s, passwordIsVisible: !s.passwordIsVisible })),
    [],
  )

  const passwordIsTooShort = React.useMemo(
    () => isTooShort(value, minLength),
    [value, minLength]
  )

  const { capsLockOn, passwordIsVisible, score, isValid } = state

  return (
    <Tooltip
      placement="right"
      title={shouldDetectCapsLock && capsLockOn ? 'Caps lock is ON' : ''}
      open={shouldDetectCapsLock && capsLockOn}
    >
      <TextField
        {...textFieldProps}
        value={value}
        onChange={onPasswordChange}
        type={passwordIsVisible ? 'text' : 'password'}
        error={error || (detectPasswordStrength && !isValid && value.length > 0)}
        InputProps={{
          ...textFieldProps.InputProps,
          endAdornment: (
            <>
              {textFieldProps.InputProps?.endAdornment}
              <InputAdornment position="end">
                {detectPasswordStrength && !!value.length && (
                  <Chip
                    color={score >= 3
                      ? 'success'
                      : score === 2
                      ? 'info'
                      : score === 1
                      ? 'warning'
                      : value.length
                      ? 'error'
                      : 'default'
                    }
                    label={passwordIsTooShort ? tooShortMessage : scoreMessages[score]}
                  />
                )}
              </InputAdornment>
              <AddOnButton position="end" onClick={toggleVisibility}>
                {passwordIsVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </AddOnButton>
            </>
          ),
        }}
      />
    </Tooltip>
  )
}




PasswordField.propTypes = {
  /** Update callback */
  onPasswordChange: PropTypes.func.isRequired,
  onValidityChange: PropTypes.func,
  shouldDetectCapsLock: PropTypes.bool,
  value: PropTypes.string,
  /** Minimum password length */
  minLength: PropTypes.number,
  /** Minumum security score */
  minScore: PropTypes.number,
  scoreMessages: PropTypes.arrayOf(PropTypes.string),
  scoreColors: PropTypes.arrayOf(PropTypes.string),
  tooShortMessage: PropTypes.string,
  userInputs: PropTypes.arrayOf(PropTypes.string),
  detectPasswordStrength: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
}
