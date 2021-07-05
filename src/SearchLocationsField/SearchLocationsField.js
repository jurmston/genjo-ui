import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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

export const SearchLocationsField = ({
  value,
  onChange,
  predictionTypes,
  countryRestrictions,
  ...textFieldProps
}) => {
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

    getPlacePredictions(placesQuery, (results, status) => {
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
      value={value ?? null}
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
}

export default SearchLocationsField
