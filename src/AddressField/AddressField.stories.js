import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
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
          onAddressValueChange={setValue}
          onAddressComponentsChange={setComponents}
          label="Primary Address"
        />
        <div style={{ marginTop: 32 }} />
        {Object.entries(components).map((component, index) => (
          <Typography key={index}>{`${component[0]}: ${component[1]}`}</Typography>
        ))}
      </div>
    </GoogleMapsWrapper>
  )
}
