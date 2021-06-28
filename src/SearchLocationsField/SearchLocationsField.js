import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/styles'

import SearchIcon from '@material-ui/icons/Search'

import { usePlacesAutocomplete, useGeocoder } from '../GoogleMapsProvider'

import { colors } from '../ThemeProvider'
import useDebounce from '../useDebounce'
import { parseGeocoderResults } from '../utils/geo'

const useStyles = makeStyles({
  // input: {
  //   ...theme.typography.subtitle1,
  //   padding: 12,
  // },
  checkIcon: {
    marginLeft: 8,
    color: colors.green[500],
  },
  searchIcon: {
    marginLeft: 8,
  },
})

export const SearchLocationsField = ({ onChange, ...textFieldProps }) => {
  const classes = useStyles()
  const [options, setOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { getPlacePredictions } = usePlacesAutocomplete()
  const { geocode } = useGeocoder()

  const [inputValue, setInputValue] = React.useState('')
  const debouncedInputValue = useDebounce(inputValue)

  /**
   * Passes a selected AutocompleteService value into the
   * geocoder to extract location details.
   *
   * @param {*} event
   * @param {*} value
   */
  function handlePlaceChange(event, value) {
    console.log({ placeChangeValue: value })
    if (value?.description) {
      geocode({ address: value.description }, results => {
        let parsedResults
        try {
          parsedResults = parseGeocoderResults(results)
        } catch (e) {
          console.log({ e })
          // TODO: need something to happen here to explain if there
          // there was an issue geoding the response.
        }

        if (parsedResults) {
          onChange(parsedResults)
        }
      })
    }
  }

  /**
   * Renders an AutocompleteService result.
   * @param {*} props
   * @param {*} option
   * @returns
   */
  function renderOption(props, option) {
    if (typeof option === 'string') {
      return (
        <Typography variant="body2" color="textSecondary">
          {option}
        </Typography>
      )
    }

    return (
      <li {...props}>
        <Typography variant="body2">{option.structured_formatting.main_text}</Typography>

        <Typography style={{ marginLeft: 8 }} variant="caption" color="textSecondary">
          {option.structured_formatting.secondary_text}
        </Typography>
      </li>
    )
  }

  // Synchronize calls to the AutocompleteService with changes
  // to the debounced input.
  React.useEffect(() => {
    if (!debouncedInputValue) {
      return
    }

    let active = true
    setIsLoading(true)

    getPlacePredictions({ input: debouncedInputValue }, results => {
      if (active) {
        let newOptions = []

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
        setIsLoading(false)
        setInputValue('')
      }
    })

    return () => {
      active = false
    }
  }, [debouncedInputValue, getPlacePredictions])

  return (
    <Autocomplete
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={options}
      fullWidth
      autoComplete
      autoSelect
      value={null}
      disableClearable
      forcePopupIcon={false}
      loading={isLoading}
      noOptionsText={
        inputValue ? 'Start typing to search for a matching address.' : 'Could not find a matching address.'
      }
      filterSelectedOptions
      onChange={handlePlaceChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={params => (
        <TextField
          {...textFieldProps}
          {...params}
          className={null}
          InputProps={{
            ...params.InputProps,
            className: null,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            className: classes.input,
            autoComplete: 'new-password',
          }}
        />
      )}
      renderOption={renderOption}
    />
  )
}

SearchLocationsField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  types: PropTypes.arrayOf(PropTypes.string),
  helperText: PropTypes.string,
}

export default SearchLocationsField
