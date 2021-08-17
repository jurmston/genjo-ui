import * as React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/SearchRounded'
import CloseIcon from '@material-ui/icons/CloseRounded'
import useDebounce from '../useDebounce'


export function SearchField({
  value: valueFromProps,
  onChange,
  delay = 250,
  shouldGrowOnFocus = false,
  ...textFieldProps
}) {
  const [inputValue, setInputValue] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)

  function handleFocus(event) {
    setIsFocused(true)
    textFieldProps?.onFocus?.(event)
  }

  function handleBlur(event) {
    setIsFocused(false)
    textFieldProps?.onBlur?.(event)
  }

  function handleChange(event) {
    setInputValue(event.target.value)
  }

  function handleClear() {
    setInputValue('')
  }

  // Synchroize local input value with changes in props value.
  React.useEffect(
    () => {
      setInputValue(valueFromProps)
    },
    [valueFromProps]
  )

  // Update the onChange handler when the input changes after a debounce.
  const debouncedInputValue = useDebounce(inputValue, delay)
  React.useEffect(
    () => {
      if (valueFromProps !== debouncedInputValue) {
        onChange(debouncedInputValue)
      }
    },
    [valueFromProps, debouncedInputValue, onChange]
  )

  return (
    <TextField
      {...textFieldProps}
      fullWidth={!shouldGrowOnFocus
        ? undefined  // rely on theme default
        : isFocused
      }
      value={inputValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      InputProps={{
        ...textFieldProps.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: Boolean(inputValue) && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

SearchField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  delay: PropTypes.number,
}
