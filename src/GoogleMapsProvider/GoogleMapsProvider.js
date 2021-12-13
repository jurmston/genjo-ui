import * as React from 'react'
import PropTypes from 'prop-types'
import { GoogleMapsContext } from './GoogleMapsContext'

export const DEFAULT_GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'

// Add `google` as a global variable so that it can be accessed
// by maps libraries like @googlemaps/markerclusterer
/* eslint-disable no-unused-vars */
/* global google */
const google = window.google
/* eslint-enable */


export function GoogleMapsProvider({
  scriptId = DEFAULT_GOOGLE_MAPS_SCRIPT_ID,
  apiKey,
  children,
}) {
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

  React.useEffect(() => {
    const existingScript = document.getElementById(scriptId)

    if (existingScript || window.google) {
      return onLoad()
    }

    setState({ ...state, status: 'loading' })

    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('id', scriptId)

    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.src = src

    const position = document.querySelector('head')
    position.appendChild(script)

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)

    // Remove script on unload
    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      scriptToRemove?.remove()
    }
  }, [])

  return <GoogleMapsContext.Provider value={{ ...state }}>{children}</GoogleMapsContext.Provider>
}

GoogleMapsProvider.propTypes = {
  /** Id for the Google Maps script tag. */
  scriptId: PropTypes.string,
  /** Wrapped content of the provider. */
  children: PropTypes.node,
  /** Your Google Maps api key. Keep it secret. Keep it safe. */
  apiKey: PropTypes.string.isRequired,
}
