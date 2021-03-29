import React from 'react'
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
      <PasswordField
        value={value}
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

Main.args = {
}
