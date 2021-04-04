import * as React from 'react'

import isHotkey from 'is-hotkey'
import { Editable, ReactEditor } from 'slate-react'

import { useTextEditor } from './context'


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}


export const Input = () => {

  const {
    classes,
    editor,
    readOnly,
    renderElement,
    renderLeaf,
    toggleMark,
    setIsFocused,
  } = useTextEditor()

  return (
    <div
      className={classes.content}
      onClick={() => ReactEditor.focus(editor)}
      onKeyPress={() => ReactEditor.focus(editor)}
      role="textbox"
      tabIndex={0}
    >
      <Editable
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </div>
  )
}
