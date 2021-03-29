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

import AutoAwesomeIcon from '@material-ui/icons/AutoAwesome'

/**
 * Breaks a string mask value into an array where each '#' is replaced wtih
 * a /\d/ and all other characters are kept as is.
 */
function convertStringMaskToArray(stringMask = '') {
  return Array.from(stringMask).map(c => {
    if (c === '#') {
      return /\w/
    }

    return c
  })
}


export const PhoneNumberField = ({
  mask = '',
  value = '',
  onChange,
  autoFormat = false,
  ...textFieldProps
}) => {
  const [isAutoFormatting, setIsAutoFormatting] = React.useState(autoFormat)

  function handleChange(event) {
    let rawValue = event.target.value

    if (!isAutoFormatting || !mask || value.startsWith(rawValue)) {
      return onChange(event, rawValue)
    }

    const formattedMask = convertStringMaskToArray(mask)

    const result = conformToMask(
      rawValue,
      formattedMask,
      {
        guide: false,
      },
    )

    return onChange(event, result?.conformedValue ?? '')
  }

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
      InputProps={{
        ...textFieldProps.InputProps,
        endAdornment: autoFormat && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setIsAutoFormatting(!isAutoFormatting)}
              color={isAutoFormatting ? 'primary' : 'default'}
            >
              <AutoAwesomeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

PhoneNumberField.propTypes = {

}
