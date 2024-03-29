import * as React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import CalendarPicker from '@mui/lab/CalendarPicker'
import DatePicker from '@mui/lab/DatePicker'
import { DateTime } from 'luxon'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import { AddOnButton } from '../AddOn'

export const DEFAULT_FORMAT = DateTime.DATE_MED


const monthFirstFormats = [
  'M/d/yy',
  'M/d/yyyy',
  'M/dd/yy',
  'M/dd/yyyy',
  'MM/d/yy',
  'MM/d/yyyy',
  'MM/dd/yy',
  'MM/dd/yyyy',
]

const dayFirstFormats = ['d/M/yy', 'd/M/yyyy', 'dd/M/yy', 'dd/M/yyyy', 'd/MM/yy', 'd/M/yyyy', 'dd/MM/yy', 'dd/MM/yyyy']

/** Convert an input string to a DateTime value */
function parseInputValue(inputValue, inputFormat) {
  if (!inputValue) {
    return null
  }

  const formats = inputFormat === 'month-first' ? monthFirstFormats : dayFirstFormats

  for (let format of formats) {
    const parsedValue = DateTime.fromFormat(inputValue, format)

    if (!parsedValue.invalid) {
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
  displayFormat = DEFAULT_FORMAT,
  value,
  onChange,
  disablePicker = false,
  hasDialog = false,
  DatePickerProps = {},
  disabled = false,
  ...textFieldProps
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [pickerIsOpen, setPickerIsOpen] = React.useState(false)

  const ref = React.useRef()

  const pickerRef = React.useRef()

  const displayValue = value ? value.toLocaleString(displayFormat) : ''

  function handleInputChange(event) {
    if (isEditing) {
      setInputValue(maskInputValue(event.target.value))
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
      setPickerIsOpen(true)
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
        disabled={disabled}
        value={isEditing ? inputValue : displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        InputProps={{
          ...textFieldProps.InputProps,
          endAdornment: !disablePicker && (
            <AddOnButton
              position="end"
              disabled={disabled}
              onClick={() => setPickerIsOpen(!pickerIsOpen)}
            >
              <CalendarTodayIcon />
            </AddOnButton>
          ),
        }}
      />

      {pickerIsOpen && hasDialog && (
        <DatePicker
          allowKeyboardControl
          {...DatePickerProps}
          open
          onClose={() => setPickerIsOpen(false)}
          date={value}
          onChange={newValue => {
            onChange(newValue)
            setPickerIsOpen(false)
          }}
          renderInput={() => ""}
        />
      )}

      {!hasDialog && (
        <Popover
          open={pickerIsOpen}
          onClose={() => setPickerIsOpen(false)}
          anchorEl={ref.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          style={{
            marginTop: 12,
          }}
          PaperProps={{
            elevation: 4,
          }}
        >
          <CalendarPicker
            allowKeyboardControl
            {...DatePickerProps}
            date={value}
            onChange={newValue => {
              onChange(newValue)
              setPickerIsOpen(false)
            }}
            ref={pickerRef}
          />
        </Popover>
      )}
    </div>
  )
}

DateField.propTypes = {
  /** Input style when using the keyboard. */
  inputFormat: PropTypes.oneOf(['month-first', 'day-first']),
  /** DateTime formating object. */
  displayFormat: PropTypes.object,
  /** Luxon DateTime. */
  value: PropTypes.object,
  /** Callback when date value is changed. */
  onChange: PropTypes.func,
  /** If `true`, the picker element will be hidden. */
  disablePicker: PropTypes.bool,
  /** If `true` the picker element will be displayed in a Dialog component. */
  hasDialog: PropTypes.bool,
  /** Props passed to the DatePicker component */
  DatePickerProps: PropTypes.object,
  /** If `true`, the field is disabled. */
  disabled: PropTypes.bool,
}

export default DateField
