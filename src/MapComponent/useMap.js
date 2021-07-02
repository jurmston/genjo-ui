import * as React from 'react'
import { MapContext } from './MapContext'

export function useMap() {
  const context = React.useContext(MapContext)

  if (context === undefined) {
    throw new Error('useMap must be within MapContext')
  }

  return context
}
