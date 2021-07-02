import * as React from 'react'
import { useGoogleMaps } from './useGoogleMaps'


const globalPlacesAutocompleteService = { current: null }


export function usePlacesAutocomplete() {
  const { status, google } = useGoogleMaps()

  React.useEffect(() => {
    if (!globalPlacesAutocompleteService.current && status === 'ready') {
      const newService = new google.maps.places.AutocompleteService()
      globalPlacesAutocompleteService.current = newService
    }
  }, [status, google])

  const getPlacePredictions = React.useCallback(
    (request, callback) => {
      globalPlacesAutocompleteService.current?.getPlacePredictions(
        request,
        callback,
      )
    },
    []
  )

  return { getPlacePredictions, status }
}
