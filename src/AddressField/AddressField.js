import * as React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { useGeocoder } from '../GoogleMapsProvider'


export const AddressField = ({
  disableGeocode = false,
  value,
  onInputChange,
  onGeocode,
  onGeocoderError,
  onGeocoderSuccess,
  onGeocoderSettled,
  componentsMap,
  ...textFieldProps
}) => {
  const { geocode } = useGeocoder()

  async function handleBlur() {
    if (disableGeocode) {
      return
    }

    const geocoderRequest = { address: value }

    try {
      onGeocode?.()
      const results = await geocode(geocoderRequest, componentsMap)
      onGeocoderSuccess?.(results)
    } catch (error) {
      onGeocoderError?.(error)
    } finally {
      onGeocoderSettled?.()
    }
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
  onGeocoderSuccess: PropTypes.func,
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
  onGeocoderSettled: PropTypes.func,
}

export default AddressField
