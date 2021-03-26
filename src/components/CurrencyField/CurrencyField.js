import React from 'react'
import PropTypes from 'prop-types'

import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, maxPlaces, fixedDecimalPlaces, ...other } = props

  console.log({ props })

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
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


export const CurrencyField = ({ symbol = '$', maxPlaces = 2, fixedDecimalPlaces = true, ...textFieldProps}) => {

  return (
    <TextField
      {...textFieldProps}
      InputProps={{
        ...textFieldProps.InputProps,
        inputComponent: NumberFormatCustom,
        startAdornment: (
          <InputAdornment position="start">{symbol}</InputAdornment>
        )
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

}
