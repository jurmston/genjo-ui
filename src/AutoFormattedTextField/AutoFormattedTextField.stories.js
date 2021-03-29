import React from 'react'

import { AutoFormattedTextField } from './AutoFormattedTextField'

export default {
  title: 'Components/AutoFormattedTextField',
  component: AutoFormattedTextField,
}

export const Main = ({ mask }) => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 300 }}>
      <AutoFormattedTextField
        label="Phone Number"
        variant="filled"
        mask={mask}
        value={value}
        autoFormat
        onChange={(event, newValue) => setValue(newValue)}
      />
    </div>
  )
}

Main.args = {
  mask: '(###) ###-####',
}
