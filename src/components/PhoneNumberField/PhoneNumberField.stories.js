import React from 'react'

import { PhoneNumberField } from './PhoneNumberField'

export default {
  title: 'Components/PhoneNumberField',
  component: PhoneNumberField,
}

export const Main = ({ mask }) => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 300 }}>
      <PhoneNumberField
        label="Phone Number"
        variant="filled"
        mask={mask}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      />
    </div>
  )
}

Main.args = {
  mask: '(###) ###-####',
}
