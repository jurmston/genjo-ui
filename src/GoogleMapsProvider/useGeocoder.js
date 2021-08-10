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
    (request, componentsMap) => {
      return new Promise((resolve, reject) => {
        globalGeocoderServer.current?.geocode(
          request,
          (results, status) => {
            if (status === 'OK') {
              return resolve(parseGeocoderResults(results, componentsMap))
            }

            return reject(status)
          },
        )
      })
    },
    []
  )

  return { status, geocode }
}
