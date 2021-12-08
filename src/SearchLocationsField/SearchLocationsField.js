import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import SearchIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

import { usePlacesAutocomplete, useGeocoder } from '../GoogleMapsProvider'

import useDebounce from '../useDebounce'


export const SearchLocationsField = ({
  value: valueFromProps,
  onChange,
  onClear,
  predictionTypes,
  countryRestrictions,
  componentsMap,
  ...textFieldProps
}) => {
  const [options, setOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { getPlacePredictions } = usePlacesAutocomplete()
  const { geocode } = useGeocoder()

  const [inputValue, setInputValue] = React.useState('')
  const debouncedInputValue = useDebounce(inputValue)

  const [error, setError] = React.useState(null)

  /**
   * Passes a selected AutocompleteService value into the
   * geocoder to extract location details.
   *
   * @param {*} event
   * @param {*} value
   */
  async function handlePlaceChange(event, value) {
    if (value?.description) {
      const geocoderRequest = { address: value.description }

      try {
        const results = await geocode(geocoderRequest, componentsMap)
        onChange(results)
      } catch (error) {
        console.log({ error })
        setError(error?.message ?? 'There was a problem using Google Maps')
      }
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
      <ListItem {...props}>
        <ListItemText
          primary={option.structured_formatting.main_text}
          secondary={option.structured_formatting.secondary_text}
        />
      </ListItem>
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

    const placesQuery = { input: debouncedInputValue }

    // Conditionally add in the extra query items.
    // See: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
    if (countryRestrictions) {
      placesQuery.componentRestrictions = {
        country: countryRestrictions
      }
    }

    if (predictionTypes) {
      placesQuery.types = predictionTypes
    }

    getPlacePredictions(placesQuery, results => {
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
      freeSolo
      autoComplete
      autoSelect
      value={valueFromProps ?? null}
      disableClearable
      forcePopupIcon={false}
      loading={isLoading}
      noOptionsText={inputValue
        ? 'Could not find a matching address.'
        : 'Start typing to search for a matching address.'
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
          helperText={error || textFieldProps.helperText}
          error={Boolean(error || textFieldProps.error)}
          InputProps={{
            ...params.InputProps,
            className: null,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: Boolean(valueFromProps) && Boolean(onClear) && (
              <InputAdornment position="end">
                <IconButton onClick={onClear}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
      renderOption={renderOption}
    />
  )
}

SearchLocationsField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  /**
   * Array of types that the predication belongs to.
   * https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction.types
   */
  predictionTypes: PropTypes.arrayOf(PropTypes.string),
  /**
   * A single country code or an array of country codes that the search results
   * should be limited to.
   * https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions.country
   */
  countryRestrictions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  helperText: PropTypes.string,
  componentsMap: PropTypes.object,
  /** Callback to clear the input. */
  onClear: PropTypes.func,
}
