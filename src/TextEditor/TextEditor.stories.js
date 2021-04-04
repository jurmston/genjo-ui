import * as React from 'react'

import TextField from '@material-ui/core/TextField'

import { TextEditor } from './TextEditor'

export default {
  title: 'Components/TextEditor',
  component: TextEditor,
}

export const Primary = () => {
  const [value, setValue] = React.useState('')

  function onSave(newValue) {
    setValue(newValue)
  }

  return (
    <>
      <TextEditor
        value={value}
        onSave={onSave}
      />

      <div style={{ marginBottom: 32 }} />

      <TextField
        label="Value as Markdown"
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
