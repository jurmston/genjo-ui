import * as React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { useGeocoder } from '../GoogleMapsProvider'


export const AddressField = ({
  disableGeocode = false,
  value,
  onInputChange,
  onGeocoderResultsChange,
  onGeocoderError,
  componentsMap,
  ...textFieldProps
}) => {
  const { geocode } = useGeocoder()

  function handleGeocoderResults(results) {
    onGeocoderResultsChange?.(results)
  }

  function handleGeocoderError(error) {
    onGeocoderError?.(error)
  }

  function handleBlur() {
    if (disableGeocode) {
      return
    }

    const geocoderQuery = { address: value }
    geocode(
      geocoderQuery,
      handleGeocoderResults,
      handleGeocoderError,
      componentsMap,
    )
  }

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={onInputChange}
      multiline
      minRows={3}
      maxRows={7}
      onBlur={handleBlur}
    />
  )
}

AddressField.propTypes = {
  /**
   * If `true`, the field will not query Google Maps for the address components.
   */
  disableGeocode: PropTypes.bool,
  /**
   * The formatted string value of the address.
   */
  value: PropTypes.string,
  /**
   * Callback fired when the formatted string value is changed.
   */
  onInputChange: PropTypes.func,
  /**
   * Callback fired when the geocoder has returned location results.
   */
  onGeocoderResultsChange: PropTypes.func,
  /**
   * Callback fired when the geocoder throws an error.
   */
  onGeocoderError: PropTypes.func,
  /**
   * A map of Google Maps address component names to the [nameType, name].
   * NameType = short_name | long_name
   * name = the name of the componeny key in the parsed results.
   */
  componentsMap: PropTypes.object,
}

export default AddressField
