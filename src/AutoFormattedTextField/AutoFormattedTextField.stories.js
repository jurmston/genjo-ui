import React from 'react'

import AutoFormattedTextField from './AutoFormattedTextField'

export default {
  title: 'Components/AutoFormattedTextField',
  component: AutoFormattedTextField,
}

export const Main = args => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 300 }}>
      <AutoFormattedTextField
        {...args}
        label="Phone Number"
        variant="filled"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      />
    </div>
  )
}

Main.args = {
  mask: '(###) ###-####',
  disableToggleButton: false,
  defaultToggleState: true,
}
