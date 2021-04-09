import * as React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { useGeocoder } from '../GoogleMapsProvider'
import { parseGeocoderResults } from '../utils/geo'

export const AddressField = ({
  disableGeocode = false,
  value: valueFromProps,
  onAddressValueChange,
  onAddressComponentsChange,
  ...textFieldProps
}) => {
  const [value, setValue] = React.useState('')
  const [originalValue, setOriginalValue] = React.useState('')
  const { geocode } = useGeocoder()

  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleBlur() {
    if (disableGeocode) {
      return onAddressValueChange(value)
    }

    if (value !== originalValue) {
      onAddressValueChange(value)

      geocode({ address: value }, results => {
        try {
          const components = parseGeocoderResults(results)
          onAddressComponentsChange(components)
        } catch (e) {
          console.log({ e })
          // TODO: need something to happen here to explain if there
          // there was an issue geoding the response.
        }
      })
    }
  }

  // Synchronize the value from props
  React.useEffect(() => {
    setValue(valueFromProps)
    setOriginalValue(valueFromProps)
  }, [valueFromProps])

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
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
  onAddressValueChange: PropTypes.func,
  /**
   * Callback fired when the geocoder has returned location results.
   */
  onAddressComponentsChange: PropTypes.func,
}

export default AddressField
