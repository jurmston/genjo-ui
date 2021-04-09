import * as React from 'react'
import PropTypes from 'prop-types'

import GoogleMapsProvider from '../../src/GoogleMapsProvider'


/**
 * Adds Google Maps support for geolocation components.
 */
export const GoogleMapsWrapper = ({ children }) => {

  return (
    <GoogleMapsProvider
      apiKey={process.env.STORYBOOK_GOOGLE_MAPS_API_KEY}
    >
      {children}
    </GoogleMapsProvider>
  )
}

GoogleMapsWrapper.propTypes = {
  /**
   * Wrapped content.
   */
  children: PropTypes.node,
}

export default GoogleMapsWrapper
