import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'


const INTEGER_KEY = /^\d$/
const NEGATIVE_KEY = /^-$/


function formatValue(value, places, decimalSeperator, thousandsSeparator) {
  // Absolute value removes the sign so that we can make sure to place it
  // to left when the value is less than zero (e.g. -0.01, not 0.-1)
  const numberValue = Math.abs(Number.parseInt(value, 10))
  const stringValue = Number.isFinite(numberValue) ? numberValue.toString() : ''

  if (stringValue === '' || stringValue === '0') {
    return ''
  }

  const integerPart = places > 0 ? stringValue.slice(0, -places).padStart(1, '0') : stringValue
  const decimalPart = places > 0 ? stringValue.slice(-places).padStart(places, '0') : ''

  const seperatedIntegerParts = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator,
  )

  const signValue = value < 0 ? '-' : ''
  // Exclude the decimal part if the places value is less than zero to better
  // support zero-decimal currencies.
  const combinedDecimalPart = places > 0 ? `${decimalSeperator}${decimalPart}` : ''

  return `${signValue}${seperatedIntegerParts}${combinedDecimalPart}`
}


export const CurrencyField = ({
  currencySymbol = '$',
  decimalPlaces = 2,
  decimalSeperator = '.',
  onChange,
  thousandsSeparator = ',',
  value,
  ...textFieldProps
}) => {
  // Flag to indicate that the negative sign was pressed, but the value is
  // still zero. When a number is pressed, it will make sure the new number is
  // negative. If the negative key is pressed twice it will cancel the flag.
  const [toggleNegative, setToggleNegative] = React.useState(false)
  React.useEffect(
    () => {
      if (value && toggleNegative) {
        setToggleNegative(false)
        onChange(null, value * -1)
      }
    },
    [value]
  )

  const displayValue = formatValue(
    value,
    decimalPlaces,
    decimalSeperator,
    thousandsSeparator,
  )

  function handleKeyDown(event) {
    const currentSignValue = value < 0 ? '-' : ''
    const currentDigits = displayValue.toString().replace(/\D/g, '')
    const currentValue = `${currentSignValue}${currentDigits}`

    // Handle deleting keys
    if (event.key === 'Backspace' || event.key === 'Delete') {
      const newValue = parseInt(currentValue.slice(0, -1), 0)
      return onChange(event, Number.isFinite(newValue) ? newValue : 0)
    }

    // Number keys
    if (INTEGER_KEY.test(event.key)) {
      const newValue = parseInt(`${currentValue}${event.key}`, 0)
      return onChange(event, Number.isFinite(newValue) ? newValue : 0)
    }

    // Negative key
    if (NEGATIVE_KEY.test(event.key)) {
      if (value) {  // Non-zero values have their sign changed.
        const toggledSignValue = currentSignValue === '-' ? '' : '-'
        const newValue = parseInt(`${toggledSignValue}${currentDigits}${event.key}`, 0)
        return onChange(event, newValue)
      } else {  // Toggle the negative flag
        setToggleNegative(!toggleNegative)
      }
    }
  }

  const placeholderSign = toggleNegative ? '-' : ''
  const placeholderDecimal = decimalPlaces > 0
    ? `${decimalSeperator}${''.padStart(decimalPlaces, '0')}`
    : ''
  const placeholder = `${placeholderSign}0${placeholderDecimal}`

  return (
    <TextField
      {...textFieldProps}
      value={displayValue}
      inputMode="numeric"
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      InputProps={{
        ...textFieldProps.InputProps,
        startAdornment: (
          <InputAdornment position="start" aria-label="currency symbol">
            {currencySymbol}
          </InputAdornment>
        ),
      }}
      inputProps={{
        ...textFieldProps.inputProps,
        style: {
          ...textFieldProps.inputProps?.style,
          textAlign: 'right',
        },
      }}
    />

  )
}

CurrencyField.propTypes = {
  /** The currency symbol to use. */
  currencySymbol: PropTypes.string,
  /** The number of fixed decimal places to show. */
  decimalPlaces: PropTypes.number,
  /** Symbol to use for seperating the integer and decimal parts. */
  decimalSeperator: PropTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: this is a generic event, not a change event.
   * @param {number} newValue The integer value of the field.
   */
  onChange: PropTypes.func,
  /** Symbol to use for seperating the thousands place. */
  thousandsSeparator: PropTypes.string,
  /** The integer value of the input. */
  value: PropTypes.number,
}

export default CurrencyField
