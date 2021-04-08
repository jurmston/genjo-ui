import * as React from 'react'
import PropTypes from 'prop-types'


export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'
export const GoogleMapsContext = React.createContext()

export const useGoogleMaps = () => {
  const context = React.useContext(GoogleMapsContext)
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider')
  }
  return context
}


export function GoogleMapsProvider({ apiKey, children }) {
  const [state, setState] = React.useState({
    status: 'idle',
    error: null,
    google: null,
  })

  function onLoad() {
    setState({ status: 'ready', google: window.google, error: null })
  }

  function onError() {
    setState({ status: 'error', google: window.google, error: null })
  }

  React.useEffect(
    () => {
      const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID)

      if (existingScript || window.google) {
        return onLoad()
      }

      setState({ ...state, status: 'loading' })

      const script = document.createElement('script')
      script.setAttribute('async', '')
      script.setAttribute('id', GOOGLE_MAPS_SCRIPT_ID)

      const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.src = src

      const position = document.querySelector('head')
      position.appendChild(script)

      script.addEventListener('load', onLoad)
      script.addEventListener('error', onError)

      // Remove script on unload
      return () => {
        const scriptToRemove = document.getElementById(GOOGLE_MAPS_SCRIPT_ID)
        scriptToRemove?.remove()
      }
    },
    [],
  )

  return (
    <GoogleMapsContext.Provider value={{ ...state }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}


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


GoogleMapsProvider.propTypes = {
  children: PropTypes.node,
  apiKey: PropTypes.string.isRequired,
}
