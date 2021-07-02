import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { getFormattedAddress, parseGeocoderResults } from '../utils/geo'
import AddressField from '../AddressField'
import MapComponent, { Marker } from '../MapComponent'
import SearchLocationsField from '../SearchLocationsField'
import { GoogleMapsProvider } from './GoogleMapsProvider'
import { useGeocoder } from './useGeocoder'

import { GoogleMapsWrapper } from '../../.storybook/components/GoogleMapsWrapper'

import useCurrentLocation from '../useCurrentLocation'

export default {
  title: 'Providers/GoogleMapsProvider',
  component: GoogleMapsProvider,
}




const PrimaryInner = () => {
  const [values, setValues] = React.useState({
    city: '',
    country: '',
    county: '',
    geopoint: {
      latitude: 39.494942918409095,
      longitude: -119.80110393425723,
    },
    postalCode: '',
    postalCodeSuffix: '',
    state: '',
    streetAddress: '',
    subpremise: '',
    formattedAddress: '',
  })

  const addressRef = React.useRef()
  const [address, setAddress] = React.useState('')
  const { geocode } = useGeocoder()

  const [currentPosition, setCurrentPosition] = React.useState(0)

  const currentLocation = useCurrentLocation()

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

  const handleMarkMove = mapMouseEvent => {
    const { latLng } = mapMouseEvent

    geocode({ location: latLng }, (results, status) => {
      setValues(parseGeocoderResults(results))
    })
  }

  return (
    <div style={{ width: 500 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            {currentLocation.isLoading ? 'LOADING...' : ''}
          </Typography>

          <Typography>
            {`${currentLocation.location?.latitude} : ${currentLocation.location?.longitude}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SearchLocationsField
            value={values?.formattedAddress ?? ''}
            placeholder="Search for an address..."
            onChange={handleSearchResult}
          />
        </Grid>

        <Grid item xs={12}>
          <MapComponent
            center={{
              lat: values.geopoint?.latitude ?? 39.494942918409095,
              lng: values.geopoint?.longitude ?? -119.80110393425723,
            }}
            onRecenter={console.log}
            onDoubleClick={handleMarkMove}
            disableDoubleClickZoom
          >
            <Marker
              position={{
                lat: values.geopoint?.latitude ?? 39.494942918409095,
                lng: values.geopoint?.longitude ?? -119.80110393425723,
              }}
              draggable
              onDragEnd={handleMarkMove}
              title="Monkeys"
            />
          </MapComponent>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => setCurrentPosition((currentPosition + 1) % 3)}
          >
            Change Marker
          </Button>
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
          <Typography>{`Geo: ${values.geopoint?.latitude ?? '-'}, ${values.geopoint?.longitude ?? '-'} (${values.geopoint?.geohash})`}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}


export const Primary = () => {
  return (
    <GoogleMapsWrapper>
      <PrimaryInner />
    </GoogleMapsWrapper>
  )
}