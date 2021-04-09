import React from 'react'
import PropTypes from 'prop-types'

import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, maxPlaces, fixedDecimalPlaces, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      fixedDecimalScale={fixedDecimalPlaces}
      decimalScale={maxPlaces}
    />
  )
})

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func,
  maxPlaces: PropTypes.number,
  fixedDecimalPlaces: PropTypes.bool,
}

export const CurrencyField = ({ symbol = '$', maxPlaces = 2, fixedDecimalPlaces = true, ...textFieldProps }) => {
  return (
    <TextField
      {...textFieldProps}
      InputProps={{
        ...textFieldProps.InputProps,
        inputComponent: NumberFormatCustom,
        startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>,
      }}
      inputProps={{
        ...textFieldProps.inputProps,
        maxPlaces,
        fixedDecimalPlaces,
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
  symbol: PropTypes.string,
  /** The max number of decimal places to show. */
  maxPlaces: PropTypes.number,
  /** If `true`, the field will always display the zero-padding max decimal places. */
  fixedDecimalPlaces: PropTypes.bool,
}

export default CurrencyField
