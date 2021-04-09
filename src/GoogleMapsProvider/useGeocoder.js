import * as React from 'react'
import useGoogleMaps from './useGoogleMaps'


export function useGeocoder() {
  const [service, setService] = React.useState(null)

  const { status, google } = useGoogleMaps()

  React.useEffect(
    () => {
      if (!service && status === 'ready') {
        setService(new google.maps.Geocoder())
      }
    },
    [status, service, google]
  )

  const geocode = React.useCallback(
    (request, callback) => {
      service?.geocode(request, callback)
    },
    [service]
  )

  return { status, geocode }
}

export default useGeocoder
