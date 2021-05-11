import React from 'react'
import TextField from '@material-ui/core/TextField'
import { PasswordField } from './PasswordField'

export default {
  title: 'Components/PasswordField',
  component: PasswordField,
}

export const Main = () => {
  const [value, setValue] = React.useState('')
  const [, setIsValid] = React.useState(false)

  return (
    <div style={{ width: 300 }}>
      <TextField
        label="Email"
        autoComplete="email"
        name="email"
        type="email"
      />

      <div style={{ marginTop: 16 }} />

      <PasswordField
        value={value}
        label="Password"
        variant="filled"
        onChange={(newValue, newIsValid) => {
          setValue(newValue)
          setIsValid(newIsValid)
        }}
        detectPasswordStrength
      />
    </div>
  )
}

Main.args = {}
