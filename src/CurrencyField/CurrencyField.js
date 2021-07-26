import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'



function formatValue(value, places, decimalSeperator, thousandSeparator) {
  // Absolute value removes the sign so that we can make sure to place it
  // to left when the value is less than zero (e.g. -0.01, not 0.-1)
  const numberValue = Math.abs(Number.parseInt(value, 10))
  const stringValue = Number.isFinite(numberValue) ? numberValue.toString() : ''

  if (stringValue === '' || stringValue === '0') {
    return ''
  }

  const integerPart = stringValue.slice(0, -places).padStart(1, '0')
  const decimalPart = stringValue.slice(-places).padStart(places, '0')

  const seperatedIntegerParts = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const signValue = value < 0 ? '-' : ''

  return `${signValue}${seperatedIntegerParts}${decimalSeperator}${decimalPart}`
}

const INTEGER_KEY = /^\d$/
const NEGATIVE_KEY = /^-$/


export const CurrencyField = ({
  currencySymbol = '$',
  decimalPlaces = 2,
  decimalSeperator = '.',
  thousandsSeparator = ',',
  value,
  onChange,
  ...textFieldProps
}) => {
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

    // Handle deleting
    if (event.key === 'Backspace' || event.key === 'Delete') {
      const newValue = parseInt(currentValue.slice(0, -1), 0)
      return onChange(event, Number.isFinite(newValue) ? newValue : 0)
    }

    if (INTEGER_KEY.test(event.key)) {
      const newValue = parseInt(`${currentValue}${event.key}`, 0)
      return onChange(event, Number.isFinite(newValue) ? newValue : 0)
    }

    if (NEGATIVE_KEY.test(event.key)) {
      if (value) {
        const toggledSignValue = currentSignValue === '-' ? '' : '-'
        const newValue = parseInt(`${toggledSignValue}${currentDigits}${event.key}`, 0)
        return onChange(event, newValue)
      } else {
        setToggleNegative(!toggleNegative)
      }
    }
  }

  const placeholderSign = toggleNegative ? '-' : ''
  const placeholder = `${placeholderSign}0${decimalSeperator}${''.padStart(decimalPlaces, '0')}`

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
  /** The max number of decimal places to show. */
  maxPlaces: PropTypes.number,
  /** If `true`, the field will always display the zero-padding max decimal places. */
  fixedDecimalPlaces: PropTypes.bool,
  value: PropTypes.number,
}

export default CurrencyField
