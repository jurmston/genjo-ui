import * as React from 'react'

import GoogleMapsContext from './GoogleMapsContext'

export const useGoogleMaps = () => {
  const context = React.useContext(GoogleMapsContext)
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider')
  }
  return context
}

export default useGoogleMaps
