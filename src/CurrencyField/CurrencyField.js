import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@mui/material/TextField'
import AddOn from '../AddOn'

import {
  getCurrencySymbol,
  getCurrencyDecimalPlaces,
  formatCurrency,
} from '../utils/money'


// Regex for testing if an input character is an integer digit or the negative
// sign.
const INTEGER_KEY = /^[\d-]$/


/**
 * Field for entering localized currency values.
 */
export const CurrencyField = ({
  locale = 'en-US',
  currency = 'USD',
  onChange,
  value: valueFromProps,
  textAlign = 'left',
  disableNegativeNumbers = false,
  shouldOverrideDecimalPlaces = false,
  decimalPlacesOverride = 0,
  ...textFieldProps
}) => {
  const decimalPlaces = React.useMemo(
    () => shouldOverrideDecimalPlaces
      ? decimalPlacesOverride
      : getCurrencyDecimalPlaces(currency),
    [currency, shouldOverrideDecimalPlaces, decimalPlacesOverride],
  )

  const decimalSeparator = React.useMemo(
    () => {
      try {
        return Intl.NumberFormat(locale)
          .formatToParts(1.1)
          .find(part => part.type === 'decimal')
          .value
      } catch {
        return '.'
      }
    },
    [locale],
  )

  const currencySymbol = React.useMemo(
    () => getCurrencySymbol(locale, currency),
    [locale, currency]
  )

  // The value from props should be a number. This parsed version is meant to
  // catch any mistypings and also truncate any float values. Additionally it
  // will force the value to be positive if negative numbers are disabled. If
  // the parsing fails, a value of 0 will be used.
  const parsedValue = React.useMemo(
    () => {
      const parsed = parseInt(valueFromProps, 10)
      return !Number.isFinite(parsed)
        ? 0
        : disableNegativeNumbers
        ? Math.abs(parsed)
        : parsed
    },
    [valueFromProps]
  )

  // This flag handles the special case where the value is 0, but the user
  // hits the minus sign to start editing a negative number.
  const [isNegative, setIsNegative] = React.useState(false)
  React.useEffect(
    () => {
      if (parsedValue) {
        setIsNegative(disableNegativeNumbers ? false : parsedValue < 0)
      }
    },
    [parsedValue, disableNegativeNumbers]
  )

  const displayValue = React.useMemo(
    () => `${(!parsedValue && isNegative) ? '-' : ''}${formatCurrency(parsedValue, {
      locale,
      currency,
      hideSymbol: true,
      shouldOverrideDecimalPlaces,
      decimalPlacesOverride,
    })}`,
    [parsedValue, locale, currency, isNegative, shouldOverrideDecimalPlaces, decimalPlacesOverride],
  )

  /**
   * When the input is focused, select the entire value.
   * @param {*} event The callback event.
   */
  function handleFocus(event) {
    event.target.select()
  }

  /**
   * Callback to intercept the user input to detect delete actions (backspace,
   * and delete) and check if the user wants to toggle editing the decimal
   * part.
   *
   * In all of our cases we are only interested in the events when the cursor
   * has zero length (i.e. not highlighting part of the value). In the cases
   * with where the cursor has length, we will just let the `handleChange`
   * operate on the new value without interference.
   * @param {*} event The callback event
   */
  function handleKeyDown(event) {
    const start = event.target.selectionStart
    const end = event.target.selectionEnd

    if (event.key === 'Backspace' && start === end) {
      // Peek behind to see what value is going to be affected.
      const selectedValue = event.target.value.slice(start - 1, start)

      // If there is no integer value and the cursor is at the beginning of a
      // negative value, widen the selection so the negative sign will be
      // deleted and the number will become positive in the `handleChange`
      // calback.
      if (!disableNegativeNumbers && start === 2 && event.target.value.slice(0, 2) === '-0') {
        event.target.setSelectionRange(0, 1)
        return
      }

      // Detect if user backspaces over a non-integer character. If so, move
      // the cursor back one spot. This will have the effect of deleting the
      // number before the non-digit character since deleting non-digits or the
      // decimal separator have no effect. For example:
      //   before backspace = 2,|432
      //   after backspace  = |432
      if (selectedValue && !INTEGER_KEY.test(selectedValue)) {
        event.target.setSelectionRange(start - 1, start - 1)
        return
      }
    }

    if (event.key === 'Delete' && start === end) {
      // Peek ahead to see what value is going to be affected.
      const selectedValue = event.target.value.slice(start, start + 1)

      // This field is biased towards the integer part of the value. If the
      // cursor is on the left of the decimal separator, pressing the delete
      // key will have the same effect as the backspace key.
      if (selectedValue === decimalSeparator) {
        event.target.setSelectionRange(start - 1, start - 1)
        return
      }

      // Similar to the backspace above except it moves the cursor forward to
      // delete the next digit. Example:
      //    before delete = 2|,432
      //    after delete  = 2|32
      if (selectedValue && !INTEGER_KEY.test(selectedValue)) {
        event.target.setSelectionRange(start + 1, start + 1)
        return
      }
    }

    // If the cursor is just to the left of the decimal separator, hitting the
    // decimal separator key should move the cursor over to the decimal part of
    // the input.
    if (event.key === decimalSeparator && start === end) {
      const selectedValue = event.target.value.slice(start, start + 1)

      if (selectedValue === decimalSeparator) {
        event.stopPropagation()
        event.preventDefault()
        event.target.setSelectionRange(start + 1, start + 1)
        return
      }
    }
  }

  /**
   * Callback to parse the text input from a localized currency string into an
   * integer value representing the zero-decimal format for a given currency.
   *
   * Example: $1,234.56 -> 123456
   *
   * @param {*} event The callback event
   */
  function handleChange(event) {
    // Split the input by the decimal separator. If there is more than one
    // separator, any part after the second will be dropped.
    const [integerPart, decimalPart] = event.target.value.split(decimalSeparator)

    // Handle the special case where the input is just the decimal separator.
    // This returns a value of 0, but moves the cursor to the first decimal
    // position.
    // Example: $0.|00
    if (event.target.value === decimalSeparator) {
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = isNegative ? 3 : 2
        element.selectionEnd = isNegative ? 3 : 2
      })
      return onChange(event, 0)
    }

    const newValueIsNegative = disableNegativeNumbers
      ? false
      : Boolean(event.target.value.match(/-/g)?.length % 2)

    let parsedIntegerPart = parseInt(
      (integerPart || '0').replace(/\D/g, '').padEnd(),
      10
    )

    let parsedDecimalPart = parseInt(
      (decimalPart || '0').slice(0, decimalPlaces).padEnd(decimalPlaces, '0').replace(/\D/g, ''),
      10
    )

    const factor = 10 ** decimalPlaces

    const newInteger = Number.isFinite(parsedIntegerPart)
      ? parsedIntegerPart * factor
      : 0

    const newDecimal = Number.isFinite(parsedDecimalPart)
      ? parsedDecimalPart
      : 0

    const newValue = (newInteger + newDecimal) * (newValueIsNegative ? -1 : 1)

    const newDisplayValue = formatCurrency(newValue, {
      locale,
      currency,
      hideSymbol: true,
      shouldOverrideDecimalPlaces,
      decimalPlacesOverride,
    })

    // React doesn't like formatting inputs with possibly new lengths (e.g. from
    // inserting commas and decimals) so it just moves the caret to the end if
    // it can't figure it out. This section calcuates where the caret should be
    // after the change and manually sets the position.
    //
    // Inspired by:
    // https://stackoverflow.com/questions/35535688/stop-cursor-jumping-when-formatting-number-in-react

    // Destructure for closure
    const caret = event.target.selectionStart
    const element = event.target

    // We need to handle being on different sides of the decimal differently.
    const decimal = `${event.target.value}${decimalSeparator}`.indexOf(decimalSeparator)

    // Get the number of non-digits up to the caret position. Comparing between
    // the new and previous values will give an offset to help position the
    // caret.
    const before = event.target.value.slice(0, caret).replace(decimalSeparator, '').replace(/\d/g, '').length
    const after = newDisplayValue.slice(0, caret).replace(decimalSeparator, '').replace(/\d/g, '').length

    // The first condition checks if the previous value was 0 and if the caret
    // is in the integer position. This handles the case where the user selects
    // the entire input and then enters a number and the caret should be placed
    // at the end of the integer part, before the decimal.

    // The second condition keeps the caret in the integer position when the
    // value is zero, if the decimal separator hasn't been entered.
    const modifiedCaret = (!parsedValue && caret <= decimal) || (!newInteger && caret <= decimal)
      ? (newValueIsNegative ? 2 : 1)
      : caret + (after - before)

    // Handle moving the cursor.
    window.requestAnimationFrame(() => {
      element.selectionStart = (newValue || caret > decimal) ? modifiedCaret : newValueIsNegative ? 2 : 1
      element.selectionEnd = (newValue || caret > decimal) ? modifiedCaret : newValueIsNegative ? 2 : 1
    })

    setIsNegative(newValueIsNegative)
    onChange(event, newValue)
  }

  return (
    <TextField
      {...textFieldProps}
      value={displayValue}
      inputMode="numeric"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      InputProps={{
        ...textFieldProps.InputProps,
        onFocus: handleFocus,
        startAdornment: (
          <AddOn position="start" aria-label="currency symbol">
            {currencySymbol}
          </AddOn>
        ),
      }}
      inputProps={{
        ...textFieldProps.inputProps,
        style: {
          textAlign,
          ...textFieldProps.inputProps?.style,
        },
      }}
    />

  )
}

CurrencyField.propTypes = {
  /** The language code to use. */
  locale: PropTypes.string,
  /** The currency code to use. */
  currency: PropTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: this is a generic event, not a change event.
   * @param {number} newValue The integer value of the field.
   */
  onChange: PropTypes.func,
  /** The integer or string value of the input. */
  value: PropTypes.number,
  /** The text alignment of the input */
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  /** If `true`, negative numbers will not be allowed. */
  disableNegativeNumbers: PropTypes.bool,
  /** If `true`, the decimal places of the currency will be manually set. */
  shouldOverrideDecimalPlaces: PropTypes.bool,
  /** The value of the manually set decimal places. */
  decimalPlacesOverride: PropTypes.number,
}

export default CurrencyField
