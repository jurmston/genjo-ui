import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
  const [isReadOnly, { toggle: toggleReadOnly }] = useOpenable()


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
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={toggle}>
          {isShowingRenderedText ? 'Show Editor' : 'Show Text'}
        </Button>

        <Button variant="outlined" onClick={toggleReadOnly}>
          {isReadOnly ? 'Read Only' : 'Editable'}
        </Button>
      </Stack>

        {isShowingRenderedText ? (
          <RenderedText
            key={resetKey}
            value={textContent}
          />
        ) : (
          <TextEditor
            {...args}
            key={resetKey}
            readOnly={isReadOnly}
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
