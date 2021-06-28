import * as React from 'react'
import { DeviceContext } from './DeviceContext'


export function useDevice() {
  const context = React.useContext(DeviceContext)

  if (context === undefined) {
    throw new Error('useDevice must be within a DeviceProvider')
  }

  return context
}
