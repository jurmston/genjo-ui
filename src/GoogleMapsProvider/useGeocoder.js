import * as React from 'react'
import { useGoogleMaps } from './useGoogleMaps'
import { parseGeocoderResults } from './utils/parseGeocoderResults'


const globalGeocoderServer = { current: null }


export function useGeocoder() {
  const { status, google } = useGoogleMaps()

  React.useEffect(() => {
    if (!globalGeocoderServer.current && status === 'ready') {
      globalGeocoderServer.current = new google.maps.Geocoder()
    }
  }, [status, google])

  const geocode = React.useCallback(
    (request, onSuccess, onError, componentsMap) => {
      try {
        globalGeocoderServer.current?.geocode(
          request,
          (results, status) => {
            if (status === 'OK') {
              return onSuccess?.(parseGeocoderResults(results, componentsMap))
            }

            return onError?.(status)
          },
        )
      } catch (error) {
        onError?.(error)
      }
    },
    []
  )

  return { status, geocode }
}
