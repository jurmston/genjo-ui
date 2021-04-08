import * as React from 'react'

import TextField from '@material-ui/core/TextField'

import { TextEditor } from './TextEditor'

export default {
  title: 'Widgets/TextEditor',
  component: TextEditor,
}

export const Primary = () => {
  const [value, setValue] = React.useState(null)

  const parsedValue = JSON.parse(value)

  return (
    <>
      <TextEditor
        value={parsedValue}
        onSave={newValue => setValue(JSON.stringify(newValue))}
      />

      <div style={{ marginBottom: 32 }} />

      <TextField
        label="Value as JSON"
        variant="filled"
        value={value}
        onChange={event => setValue(event.target.value)}
        multiline
        minRows={6}
        maxRows={20}
      />
    </>
  )
}
