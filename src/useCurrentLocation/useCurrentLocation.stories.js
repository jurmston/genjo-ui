import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import MapComponent, { Marker } from '../MapComponent'
import { GoogleMapsWrapper } from '../../.storybook/components/GoogleMapsWrapper'
import { useCurrentLocation } from './useCurrentLocation'


export default {
  title: 'Hooks/useCurrentLocation',
  component: useCurrentLocation,
}


const PrimaryInner = () => {
  const currentLocation = useCurrentLocation()

  console.log({ currentLocation })

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
          <MapComponent
            center={{
              lat: currentLocation.location?.latitude,
              lng: currentLocation.location?.longitude,
            }}
            disableDoubleClickZoom
          >
            {Boolean(location) && (
              <Marker
                position={{
                  lat: currentLocation.location?.latitude,
                  lng: currentLocation.location?.longitude,
                }}
                title="Monkeys"
              />
            )}
          </MapComponent>
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