import React from 'react'

import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { AddOnButton } from '../AddOn'
import { useSyncedProp } from './useSyncedProp'

export default {
  title: 'Hooks/useSyncedProp',
}

export const Primary = () => {
  const [propValue, setPropValue] = React.useState('Chicken Monkey')
  const [syncedValue, setSyncedValue] = useSyncedProp(propValue)

  function handleSubmit(event) {
    event.preventDefault()
    setPropValue(syncedValue)
  }

  return (
    <div style={{ width: 300 }}>
      <Stack spacing={1}>
        <TextField label="Prop Value" value={propValue} onChange={event => setPropValue(event.target.value)} />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Synced Value"
            value={syncedValue}
            onChange={event => setSyncedValue(event.target.value)}
            InputProps={{
              endAdornment: (
                <AddOnButton position="end" type="submit">
                  Save
                </AddOnButton>
              )
            }}
          />
        </form>
      </Stack>
    </div>
  )
}

Primary.args = {
  delay: 250,
}
