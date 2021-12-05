import * as React from 'react'
import PropTypes from 'prop-types'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import useDebounce from '../useDebounce'
import useSyncedProp from '../useSyncedProp'


/**
 * MuiTextField with a debounced input that exectues a search callback.
 *
 * Don't forget to memoize the callback!
 * @returns
 */
export function SearchField({
  onSearch,
  delay = 250,
  shouldGrowOnFocus = false,
  fullWidth,
  ...textFieldProps
}) {
  const [inputValue, setInputValue] = useSyncedProp('')

  function handleChange(event) {
    setInputValue(event.target.value)
  }

  function handleClear() {
    setInputValue('')
    onSearch('')
  }

  // Update the onSearch handler when the input changes after a debounce.
  const debouncedInputValue = useDebounce(inputValue, delay)
  React.useEffect(
    () => {
      if (debouncedInputValue) {
        onSearch(debouncedInputValue)
      }
    },
    [debouncedInputValue, onSearch]
  )

  return (
    <TextField
      {...textFieldProps}
      fullWidth={shouldGrowOnFocus ? false : fullWidth}
      value={inputValue}
      onChange={handleChange}
      sx={{
        '&:focus-within': {
          width: shouldGrowOnFocus || fullWidth
          ? '100%'
          : 'unset',

          'input': {
            width: shouldGrowOnFocus || fullWidth
              ? '100%'
              : 'unset',
          },
        },
      }}
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
  initialValue: PropTypes.string,
  onSearch: PropTypes.func,
  delay: PropTypes.number,
  shouldGrowOnFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
}
