import React from 'react'
import Typography from '@mui/material/Typography'
import { DeviceProvider } from './DeviceProvider'
import { useDevice } from './useDevice'

export default {
  title: 'Providers/DeviceProvider',
  component: DeviceProvider,
}

const ShowDeviceInfo = () => {
  const { width, isMobile, orientation, mode } = useDevice()

  return (
    <div>
      <Typography>
        <strong>Width: </strong>
        {width}
      </Typography>
      <Typography>
        <strong>Is Mobile?: </strong>
        {isMobile ? 'Yes' : 'No'}
      </Typography>
      <Typography>
        <strong>Orientation: </strong>
        {orientation}
      </Typography>
      <Typography>
        <strong>Mode: </strong>
        {mode}
      </Typography>
    </div>
  )
}

export const Main = () => {
  return (
    <DeviceProvider>
      <ShowDeviceInfo />
    </DeviceProvider>
  )
}
