import * as React from 'react'
import PropTypes from 'prop-types'
import GoogleMapsContext from './GoogleMapsContext'

export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'

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

  React.useEffect(() => {
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
  }, [])

  return <GoogleMapsContext.Provider value={{ ...state }}>{children}</GoogleMapsContext.Provider>
}

GoogleMapsProvider.propTypes = {
  children: PropTypes.node,
  apiKey: PropTypes.string.isRequired,
}

export default GoogleMapsProvider
