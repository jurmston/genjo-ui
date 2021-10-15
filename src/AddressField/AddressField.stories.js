import * as React from 'react'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import AddressField from './AddressField'
import GoogleMapsWrapper from '../../.storybook/components/GoogleMapsWrapper'

export default {
  title: 'Components/AddressField',
  component: AddressField,
}

export const Primary = () => {
  const [value, setValue] = React.useState('')
  const [components, setComponents] = React.useState({})

  const theme = useTheme()
  console.log({ theme })

  return (
    <GoogleMapsWrapper>
      <div style={{ width: 300 }}>
        <AddressField
          value={value}
          onInputChange={event => setValue(event.target.value)}
          onGeocoderSuccess={results => setComponents(results ?? {})}
          label="Primary Address"
        />
        <div style={{ marginTop: 32 }} />
        {Object.entries(components?.components ?? {}).map((component, index) => (
          <Typography key={index}>{`${component[0]}: ${component[1]}`}</Typography>
        ))}
      </div>
    </GoogleMapsWrapper>
  )
}
