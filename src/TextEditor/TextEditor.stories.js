import * as React from 'react'
import Button from '@mui/material/Button'
import { TextEditor } from './TextEditor'
import SaveButtonsDialog from '../SaveButtonsDialog'
import { RenderedText } from './RenderedText'
import { useTextContent } from './useTextContent'
import useStoredState from '../useStoredState'
import useOpenable from '../useOpenable'

export default {
  title: 'Widgets/TextEditor',
  component: TextEditor,
}

export const Primary = (args) => {
  const [isShowingRenderedText, { toggle }] = useOpenable()

  const [value, setValue] = useStoredState({
    key: 'genjoTextEditorValue',
    initialValue: 'test',
  })

  const {
    value: textContent,
    setValue: setTextContent,
    isDirty,
    reset: resetTextContent,
    resetKey,
  } = useTextContent(value)

  function handleSave() {
    setValue(JSON.stringify(textContent))
  }

  return (
    <>
        <Button variant="outlined" onClick={toggle} sx={{ mb: 2 }}>
          {isShowingRenderedText ? 'Show Editor' : 'Show Text'}
        </Button>

        {isShowingRenderedText ? (
            <RenderedText
            value={textContent}
          />
        ) : (
          <TextEditor
            {...args}
            key={resetKey}
            initialValue={textContent}
            onChange={setTextContent}
            minHeight={200}
            maxHeight={200}
          />
        )}

        <SaveButtonsDialog
          isIn={isDirty}
          onCancel={resetTextContent}
          onSave={handleSave}
        />
    </>
  )
}
