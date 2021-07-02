import * as React from 'react'
import { useGoogleMaps } from './useGoogleMaps'


const globalGeocoderServer = { current: null }


export function useGeocoder() {
  const { status, google } = useGoogleMaps()

  React.useEffect(() => {
    if (!globalGeocoderServer.current && status === 'ready') {
      globalGeocoderServer.current = new google.maps.Geocoder()
    }
  }, [status, google])

  const geocode = React.useCallback(
    (request, callback) => {
      globalGeocoderServer.current?.geocode(
        request,
        callback,
      )
    },
    []
  )

  return { status, geocode }
}
