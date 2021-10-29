import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import AddressField from '../AddressField'
import MapComponent, { Marker } from '../MapComponent'
import SearchLocationsField from '../SearchLocationsField'
import Checkbox from '../Checkbox'
import { GoogleMapsProvider } from './GoogleMapsProvider'
import { useGeocoder } from './useGeocoder'
import { formatAddressComponents } from './utils'

import { GoogleMapsWrapper } from '../../.storybook/components/GoogleMapsWrapper'

import useCurrentLocation from '../useCurrentLocation'

export default {
  title: 'Providers/GoogleMapsProvider',
  component: GoogleMapsProvider,
}




const PrimaryInner = () => {
  const [options, setOptions] = React.useState({
    shouldIncludeCountry: false,
    shouldIncludeCounty: false,
    shouldIncludePostalCodeSuffix: false,
    shouldIncludeSubpremise: false,
  })

  function toggleOption(option) {
    setOptions({
      ...options,
      [option]: !options[option],
    })
  }

  const [values, setValues] = React.useState({
    text: '',

    geopoint: {
      latitude: 39.494942918409095,
      longitude: -119.80110393425723,
    },

    components: null,

    placeId: null,

    formattedAddress: '',
  })

  const addressRef = React.useRef()
  const { geocode } = useGeocoder()

  const [currentPosition, setCurrentPosition] = React.useState(0)

  const currentLocation = useCurrentLocation()

  function handleAddressChange(event) {
    setValues(v => ({
      text: event.target.value,
      geopoint: v.geopoint,
      formattedAddress: v.formattedAddress,
      components: v.components,
      placeId: v.placeId,
    }))
  }

  function handleGeocoderResultsChange(results) {
    const { geopoint, formattedAddress, components, placeId } = results
    setValues(v => ({
      text: v.text,
      geopoint,
      formattedAddress,
      components,
      placeId,
    }))
  }

  function handleSearchResult(results) {
    const { geopoint, formattedAddress, components, placeId } = results
    const text = formatAddressComponents(components, options)

    setValues({
      text,
      components,
      formattedAddress,
      placeId,
      geopoint,
    })

    // Focus the address input
    addressRef.current?.focus()
  }

  const handleMarkMove = mapMouseEvent => {
    const { latLng } = mapMouseEvent
    const geocoderRequest = { location: latLng }

    geocode(geocoderRequest, handleSearchResult)
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
            onClear={() => setValues({
              text: '',
              geopoint: {
                latitude: 39.494942918409095,
                longitude: -119.80110393425723,
              },

              components: null,

              placeId: null,

              formattedAddress: '',
            })}
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
            value={values.text}
            onInputChange={handleAddressChange}
            onGeocoderSuccess={handleGeocoderResultsChange}
            inputRef={addressRef}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label="Include Country?"
            control={
              <Checkbox
                checked={options.shouldIncludeCountry}
                onChange={() => toggleOption('shouldIncludeCountry')}
              />
            }
          />
          <FormControlLabel
            label="Include County?"
            control={
              <Checkbox
                checked={options.shouldIncludeCounty}
                onChange={() => toggleOption('shouldIncludeCounty')}
              />
            }
          />
          <FormControlLabel
            label="Include Postal Code Suffix?"
            control={
              <Checkbox
                checked={options.shouldIncludePostalCodeSuffix}
                onChange={() => toggleOption('shouldIncludePostalCodeSuffix')}
              />
            }
          />
          <FormControlLabel
            label="Include Subpremise?"
            control={
              <Checkbox
                checked={options.shouldIncludeSubpremise}
                onChange={() => toggleOption('shouldIncludeSubpremise')}
              />
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>{`Address: ${values.formattedAddress}`}</Typography>
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