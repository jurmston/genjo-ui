import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { SaveButtonsDialog } from './SaveButtonsDialog'

export default {
  title: 'Components/SaveButtonsDialog',
  component: SaveButtonsDialog,
}

export const Primary = () => {
  const [value, setValue] = React.useState('Original Value')
  const [originalValue, setOriginalValue] = React.useState('Original Value')

  return (
    <div style={{ width: 300 }}>
      <TextField
        variant="filled"
        value={value}
        onChange={event => setValue(event.target.value)}
      />

      <SaveButtonsDialog
        isIn={value !== originalValue}
        onCancel={() => setValue(setOriginalValue)}
        onSave={() => setOriginalValue(value)}
      />
    </div>
  )
}
