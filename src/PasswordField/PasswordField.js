import React from 'react'
import PropTypes from 'prop-types'

import zxcvbn from 'zxcvbn'

import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const propTypes = {
  /** Update callback */
  onChange: PropTypes.func.isRequired,
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
  error: PropTypes.any,
}

const defaultProps = {
  value: '',
  shouldDetectCapsLock: true,
  minLength: 8,
  minScore: 2,
  scoreMessages: ['Bad', 'Weak', 'Okay', 'Good', 'Strong'],
  tooShortMessage: 'Too Short',
  userInputs: [],
  detectPasswordStrength: false,
  label: 'Password',
}

const isTooShort = (password, minLength) => password.length < minLength

export class PasswordField extends React.Component {
  state = {
    passwordIsVisible: false,
    capsLockOn: false,
    score: 0,
    isValid: false,
  }

  handleChange = event => {
    const { detectPasswordStrength } = this.props
    const password = event.target.value

    if (detectPasswordStrength) {
      this.updatePassword(password)
    } else {
      this.props.onChange(password, true)
    }
  }

  updatePassword = password => {
    const { onChange, minScore, minLength, userInputs } = this.props

    let score = 0

    if (!isTooShort(password, minLength)) {
      const result = zxcvbn(password, userInputs)
      score = result.score
    }

    const isValid = score >= minScore

    this.setState(
      {
        isValid,
        score,
      },
      () => onChange(password, isValid)
    )
  }

  componentDidMount = () => {
    if (this.props.shouldDetectCapsLock) {
      window.addEventListener('keydown', this.handleDetectCapsLocks)
      window.addEventListener('keyup', this.handleDetectCapsLocks)
    }
  }

  componentWillUnmount = () => {
    if (this.props.shouldDetectCapsLock) {
      window.removeEventListener('keydown', this.handleDetectCapsLocks)
      window.removeEventListener('keyup', this.handleDetectCapsLocks)
    }
  }

  handleDetectCapsLocks = event => {
    if (!event?.getModifierState) {
      return
    }

    const capsLockOn = event.getModifierState('CapsLock')

    if (capsLockOn !== this.state.capsLockOn) {
      this.setState({ capsLockOn })
    }
  }

  togglePasswordVisibility = () =>
    this.setState({
      passwordIsVisible: !this.state.passwordIsVisible,
    })

  render = () => {
    const {
      value,
      shouldDetectCapsLock,
      scoreMessages,
      tooShortMessage,
      minLength,
      detectPasswordStrength,
      label,
      error,
      // eslint-disable-next-line
      userInputs,
      // eslint-disable-next-line
      minScore,
      ...textFieldProps
    } = this.props
    const { passwordIsVisible, capsLockOn, score } = this.state

    const passwordIsTooShort = isTooShort(value, minLength)

    return (
      <Tooltip
        placement="right"
        title={shouldDetectCapsLock && capsLockOn ? 'Caps lock is ON' : ''}
        open={shouldDetectCapsLock && capsLockOn}
      >
        <div style={{ width: '100%' }}>
          <TextField
            {...textFieldProps}
            label={label}
            value={value}
            error={error}
            onChange={this.handleChange}
            type={passwordIsVisible ? 'text' : 'password'}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <>
                  {textFieldProps.InputProps?.endAdornment}
                  <InputAdornment position="end">
                    {detectPasswordStrength && !!value.length && (
                      <Typography variant="caption" noWrap color="textSecondary">
                        {passwordIsTooShort ? tooShortMessage : scoreMessages[score]}
                      </Typography>
                    )}
                    <IconButton onClick={this.togglePasswordVisibility} tabIndex={-1}>
                      {passwordIsVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                </>
              ),
              style: detectPasswordStrength && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          {detectPasswordStrength && (
            <div style={{ width: '100%', marginTop: 0 }}>
              <LinearProgress
                color={
                  score >= 3
                    ? 'success'
                    : score === 2
                    ? 'info'
                    : score === 1
                    ? 'warning'
                    : value.length
                    ? 'error'
                    : 'primary'
                }
                variant="determinate"
                value={score * 25}
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              />
            </div>
          )}
        </div>
      </Tooltip>
    )
  }
}

PasswordField.propTypes = propTypes
PasswordField.defaultProps = defaultProps

export default PasswordField
