import React from 'react'
import TextField from '@mui/material/TextField'
import { PasswordField } from './PasswordField'

export default {
  title: 'Components/PasswordField',
  component: PasswordField,
}

export const Main = () => {
  const [value, setValue] = React.useState('')
  const [isValid, setIsValid] = React.useState(false)

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
        onPasswordChange={event => setValue(event.target.value)}
        onValidityChange={setIsValid}
        detectPasswordStrength
        helperText={`Password is ${isValid ? 'valid' : 'invalid'}`}
      />
    </div>
  )
}

Main.args = {}
