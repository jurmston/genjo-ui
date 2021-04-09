import * as React from 'react'
import useGoogleMaps from './useGoogleMaps'


export function usePlacesAutocomplete() {
  const [service, setService] = React.useState(null)

  const { status, google } = useGoogleMaps()

  React.useEffect(
    () => {
      if (!service && status === 'ready') {
        const newService = new google.maps.places.AutocompleteService()
        setService(newService)
      }
    },
    [status, service, google]
  )

  const getPlacePredictions = React.useCallback(
    (request, callback) => {
      service?.getPlacePredictions(request, callback)
    },
    [service]
  )

  return  { getPlacePredictions, status }
}

export default usePlacesAutocomplete
