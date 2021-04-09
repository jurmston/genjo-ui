import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { getFormattedAddress } from '../utils/geo'
import AddressField from '../AddressField'
import SearchLocationsField from '../SearchLocationsField'
import GoogleMapsProvider from './GoogleMapsProvider'

import { GoogleMapsWrapper } from '../../.storybook/components/GoogleMapsWrapper'

export default {
  title: 'Providers/GoogleMapsProvider',
  component: GoogleMapsProvider,
}

export const Primary = () => {
  const [values, setValues] = React.useState({
    city: '',
    country: '',
    county: '',
    geohash: '',
    latitude: '',
    longitude: '',
    postalCode: '',
    postalCodeSuffix: '',
    state: '',
    streetAddress: '',
    subpremise: '',
  })
  const addressRef = React.useRef()
  const [address, setAddress] = React.useState('')

  function handleSearchResult(result) {
    const newValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = result[key] ?? ''
      return acc
    }, {})

    setValues(newValues)

    const newAddress = getFormattedAddress(result)
    setAddress(newAddress)

    // Focus the address input
    addressRef.current?.focus()
  }

  return (
    <GoogleMapsWrapper>
      <div style={{ width: 300 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchLocationsField placeholder="Search for an address..." onChange={handleSearchResult} />
          </Grid>

          <Grid item xs={12}>
            <AddressField
              label="Address"
              value={address}
              onAddressValueChange={setAddress}
              onAddressComponentsChange={setValues}
              inputRef={addressRef}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>{`Street Address: ${values.streetAddress}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`City: ${values.city}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`County: ${values.county}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`State: ${values.state}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`Zip Code: ${values.postalCode}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`Country: ${values.country}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{`Geo: ${values.latitude ?? '-'}, ${values.longitude ?? '-'} (${values.geohash})`}</Typography>
          </Grid>
        </Grid>
      </div>
    </GoogleMapsWrapper>
  )
}
