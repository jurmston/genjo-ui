import * as React from 'react'
import PropTypes from 'prop-types'
import { conformToMask } from 'react-text-mask'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { AddOnButton } from '../AddOn'

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

export const AutoFormattedTextField = ({
  mask = '',
  value = '',
  onChange,
  defaultToggleState = true,
  disableToggleButton = false,
  toggleButtonLabel = 'Auto',
  ...textFieldProps
}) => {
  const [isAutoFormatting, setIsAutoFormatting] = React.useState(defaultToggleState)

  function formatValue(rawValue = '') {
    const formattedMask = convertStringMaskToArray(mask)

    const result = conformToMask(rawValue, formattedMask, {
      guide: false,
    })

    return result?.conformedValue ?? ''
  }

  function handleChange(event) {
    let rawValue = event.target.value

    if (!isAutoFormatting || !mask || value.startsWith(rawValue)) {
      return onChange(event, rawValue)
    }

    return onChange(event, formatValue(rawValue))
  }

  function handleToggleClick(event) {
    if (!isAutoFormatting) {
      onChange(event, formatValue(value))
    }

    setIsAutoFormatting(s => !s)
  }

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
      InputProps={{
        ...textFieldProps.InputProps,
        endAdornment: !disableToggleButton && (
          <Chip
            sx={{ mr: 0.5 }}
            clickable
            onClick={handleToggleClick}
            color={isAutoFormatting ? 'primary': 'default'}
            label={toggleButtonLabel}
          />
        ),
      }}
    />
  )
}

AutoFormattedTextField.propTypes = {
  /** Mask format value */
  mask: PropTypes.string,
  /** Value of the input */
  value: PropTypes.string,
  /** Callback when the input changes */
  onChange: PropTypes.func,
  /** If `true`, the mask function will be applied when `onChange` is called. */
  autoFormat: PropTypes.bool,
}

export default AutoFormattedTextField
