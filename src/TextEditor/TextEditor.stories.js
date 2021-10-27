import * as React from 'react'
import { TextEditor } from './TextEditor'
import SaveButtonsDialog from '../SaveButtonsDialog'
import { RenderedText } from './RenderedText'
import { useTextContent } from './useTextContent'


export default {
  title: 'Widgets/TextEditor',
  component: TextEditor,
}

export const Messages = () => {
  const [value, setValue] = React.useState('')

  const {
    value: textContent,
    setValue: setTextContent,
    isDirty,
    reset: resetTextContent,
  } = useTextContent(value)

  function handleSave() {
    setValue(JSON.stringify(textContent))
  }

  return (
    <>
        <TextEditor
          value={textContent}
          onChange={setTextContent}
          minHeight={200}
          maxHeight={200}
        />

        <div style={{ marginBottom: 32 }} />

        <RenderedText
          value={textContent}
        />

        <SaveButtonsDialog
          isIn={isDirty}
          onCancel={resetTextContent}
          onSave={handleSave}
        />
    </>
  )
}
