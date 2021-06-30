import * as React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import ClockPicker from '@material-ui/lab/ClockPicker'
import TimePicker from '@material-ui/lab/TimePicker'
import { DateTime } from 'luxon'
import TimeIcon from '@material-ui/icons/AccessTimeRounded'

import useDimensions from '../useDimensions'

const validFormats = [
  'h:mm a',
  'hh:mm a',
  'h:mma',
  'hh:mma',
  'H:mm',
  'HH:mm',
]

/** Convert an input string to a DateTime value */
function parseInputValue(inputValue) {
  if (!inputValue) {
    return null
  }

  console.log('Parsing', inputValue)

  for (let format of validFormats) {
    const parsedValue = DateTime.fromFormat(inputValue, format)

    if (!parsedValue.invalid) {
      console.log(format)
      return parsedValue
    }
  }

  return null
}

/** Convert a Time value to an input string */
function getInputValue(value, inputFormat) {
  if (!value) {
    return ''
  }

  const format = inputFormat === 'ampm' ? 'h:mm a' : 'H:mm'

  return value.toFormat(format)
}

function maskInputValue(inputValue = '', isDeleting = false) {
  const sections = inputValue.split(':').slice(0, 2)

  // If the user types an extra digit we will assume they want
  // to continue typing to the next section without wanting to
  // type the backslash.
  let carryOver = ''

  const parsedSections = sections.map((section, index) => {
    const digits = section.replaceAll(/\D/g, '')

    // Capture any excess digits and store in the `carryOver`
    carryOver = digits.substring(2, 3)

    return digits.substring(0, index === 2 ? 4 : 2).replaceAll(/\D/g, '')
  })

  // Only add the carryOver if we are on the month or day sections.
  if (carryOver && parsedSections.length < 2) {
    parsedSections.push(carryOver)
  }

  let time = parsedSections.join(':')

  console.log({ inputValue, isDeleting })

  if (!isDeleting) {
    if (inputValue.endsWith('a') || inputValue.endsWith('am') || inputValue.endsWith('A') || inputValue.endsWith('AM')) {
      time = `${time} AM`
    }

    if (inputValue.endsWith('p') || inputValue.endsWith('pm') || inputValue.endsWith('P') || inputValue.endsWith('PM')) {
      time = `${time} PM`
    }
  }

  if (inputValue.endsWith(' ') && parsedSections.length === 2) {
    time = `${time} `
  }

  return time
}

export const TimeField = ({
  inputFormat = 'ampm',
  displayFormat = DateTime.TIME_SIMPLE,
  value,
  onChange,
  disablePicker = false,
  hasDialog = false,
  minuteStep = 1,
  ...textFieldProps
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [pickerState, setPickerState] = React.useState('closed')

  const [ref, dim] = useDimensions()

  const pickerRef = React.useRef()

  const displayValue = value ? value.toLocaleString(displayFormat) : ''

  const pickerIsOpen = pickerState !== 'closed'

  console.log({
    displayValue,
    inputValue,
    value,
    pickerState,
  })

  function handleInputChange(event) {
    if (isEditing) {
      const isDeleting = event.target.value <= inputValue

      console.log({ prev: inputValue, next: event.target.value })
      setInputValue(maskInputValue(event.target.value, isDeleting))
      // setInputValue(event.target.value)
    }
  }

  function handleFocus() {
    setIsEditing(true)
  }

  function handleInputBlur() {
    if (!pickerIsOpen) {
      setIsEditing(false)
      const newValue = parseInputValue(inputValue, inputFormat)
      onChange(newValue)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newValue = parseInputValue(inputValue, inputFormat)

      if (newValue || !inputValue) {
        onChange(newValue)
      }
    }

    if (event.key === 'ArrowDown') {
      setPickerState('closed')
    }
  }

  React.useEffect(() => {
    setInputValue(getInputValue(value, inputFormat))
  }, [value])

  React.useEffect(() => {
    pickerRef.current?.focus()
  }, [pickerRef])

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <TextField
        {...textFieldProps}
        value={isEditing ? inputValue : displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        InputProps={{
          ...textFieldProps.InputProps,
          endAdornment: !disablePicker && (
            <>
              {textFieldProps.InputProps?.endAdornment}
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPickerState(pickerState === 'closed'
                    ? 'hours'
                    : pickerState === 'hours'
                    ? 'minutes'
                    : 'closed'
                  )}
                  color={pickerIsOpen ? 'primary' : 'default'}
                >
                  <TimeIcon />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />

      {pickerIsOpen && hasDialog && (
        <TimePicker
          open
          onClose={() => setPickerState('closed')}
          allowKeyboardControl
          date={value}
          onChange={newValue => {
            onChange(newValue)
            // console.log(pickerState)
            // setPickerState(pickerState === 'hours' ? 'minutes' : 'closed')
          }}
          renderInput={() => ""}
        />
      )}

      {pickerIsOpen && !hasDialog && (
        <ClickAwayListener onClickAway={() => setPickerState('closed')}>
          <Paper
            style={{
              left: 0,
              position: 'absolute',
              top: dim.height + 8,
            }}
          >
            <ClockPicker
              ampm={inputFormat === 'ampm'}
              ampmInClock={inputFormat === 'ampm'}
              minuteStep={minuteStep}
              allowKeyboardControl
              date={value}
              view={pickerState}
              onChange={(newValue, reason) => {
                onChange(newValue)

                if (reason !== 'shallow') {
                  setPickerState(pickerState === 'hours' ? 'minutes' : 'closed')
                }
                // setPickerIsOpen(false)
              }}
              ref={pickerRef}
            />
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  )
}

TimeField.propTypes = {
  /** Input style when using the keyboard. */
  inputFormat: PropTypes.oneOf(['ampm', '24hr']),
  /** DateTime formating object. */
  displayFormat: PropTypes.object,
  /** ISO Date string. */
  value: PropTypes.string,
  /** Callback when date value is changed. */
  onChange: PropTypes.func,
  /** If `true`, the picker element will be hidden. */
  disablePicker: PropTypes.bool,
  /** If `true` the picker element will be displayed in a Dialog component. */
  hasDialog: PropTypes.bool,
  /** The step value for the minutes clock. */
  minuteStep: PropTypes.number,
}
