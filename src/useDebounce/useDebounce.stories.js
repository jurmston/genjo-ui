import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { useDebounce } from './useDebounce'

export default {
  title: 'Hooks/useDebounce',
  argTypes: {
    delay: {
      control: {
        type: 'range',
        min: 100,
        max: 2000,
        step: 10,
      }
    }
  }
}

export const Primary = ({ ...args }) => {
  const [value, setValue] = React.useState('')
  const debouncedValue = useDebounce(value, args.delay)

  return (
    <div style={{ width: 300 }}>
      <TextField
        label="Seach Query"
        value={value}
        onChange={event => setValue(event.target.value)}
      />

      <Typography>{`Query to search: ${debouncedValue}`}</Typography>
    </div>
  )
}

Primary.args = {
  delay: 250,
}
