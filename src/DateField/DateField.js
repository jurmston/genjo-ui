import * as React from 'react'
import PropTypes from 'prop-types'
import { conformToMask } from 'react-text-mask'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import StaticDatePicker from '@material-ui/lab/StaticDatePicker'
import DayPicker from '@material-ui/lab/DayPicker'
import { DateTime } from 'luxon'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

import { useDimensions } from '../useDimensions'


const monthFirstFormats = [
  'M/d/yy', 'M/d/yyyy',
  'M/dd/yy', 'M/dd/yyyy',
  'MM/d/yy', 'MM/d/yyyy',
  'MM/dd/yy', 'MM/dd/yyyy',
]

const dayFirstFormats = [
  'd/M/yy', 'd/M/yyyy',
  'dd/M/yy', 'dd/M/yyyy',
  'd/MM/yy', 'd/M/yyyy',
  'dd/MM/yy', 'dd/MM/yyyy',
]


/** Convert an input string to a DateTime value */
function parseInputValue(inputValue, inputFormat) {
  if (!inputValue) {
    return null
  }

  const formats = inputFormat === 'month-first'
    ? monthFirstFormats
    : dayFirstFormats

  for (let format of formats) {
    const parsedValue = DateTime.fromFormat(inputValue, format)

    if (!parsedValue.invalid) {
      console.log({ match: format })
      return parsedValue
    }
  }

  return null
}


/** Convert a DateTime value to an input string */
function getInputValue(value, inputFormat) {
  if (!value) {
    return ''
  }

  const format = inputFormat === 'month-first' ? 'M/d/yyyy' : 'd/M/yyyy'

  return value.toFormat(format)
}


function maskInputValue(inputValue = '') {
  let first = 0
  let second = 0
  let year = 0

  const sections = inputValue.split('/').slice(0, 3)

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
  if (carryOver && parsedSections.length < 3) {
    parsedSections.push(carryOver)
  }

  return parsedSections.join('/')
}


export const DateField = ({
  inputFormat = 'month-first',
  displayFormat = DateTime.DATE_MED,
  value,
  onChange,
  hasPicker = true,
  ...textFieldProps
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [pickerIsOpen, setPickerIsOpen] = React.useState(false)
  const [isHoveringPicker, setIsHoveringPicker] = React.useState(false)

  const [ref, dim, ] = useDimensions()

  const pickerRef = React.useRef()

  const displayValue = value
    ? value.toLocaleString(displayFormat)
    : ''

  function handleInputChange(event) {
    if (isEditing) {
      setInputValue(maskInputValue(event.target.value))
    }
  }

  function handleFocus(event) {
    setIsEditing(true)
  }

  function handleInputBlur(event) {
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
      setPickerIsOpen(true)
    }
  }

  function updateValueFromPicker(newValue) {
    onChange(newValue)
    setPickerIsOpen(false)
    setIsEditing(false)
  }

  React.useEffect(
    () => {
      setInputValue(getInputValue(value, inputFormat))
    },
    [value]
  )

  React.useEffect(
    () => {
      pickerRef.current?.focus()
    },
    [pickerRef]
  )

  return (
    <div
      style={{ position: 'relative' }}
      ref={ref}
    >
      <TextField
        {...textFieldProps}
        value={isEditing ? inputValue : displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        InputProps={{
          ...textFieldProps.InputProps,
          endAdornment: hasPicker && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setPickerIsOpen(!pickerIsOpen)}
                color={pickerIsOpen ? 'primary' : 'default'}
              >
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {pickerIsOpen && (
        <ClickAwayListener
          onClickAway={() => setPickerIsOpen(false)}
        >
          <Paper
            style={{
              left: 0,
              position: 'absolute',
              top: dim.height + 8,
            }}
            onMouseEnter={() => setIsHoveringPicker(true)}
            onMouseLeave={() => setIsHoveringPicker(false)}
          >
            <DayPicker
              allowKeyboardControl
              date={value}
              onChange={newValue => {
                onChange(newValue)
                setPickerIsOpen(false)

              }}
              ref={pickerRef}
            />
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  )
}

DateField.propTypes = {

}