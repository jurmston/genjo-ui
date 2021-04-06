import * as React from 'react'

import isHotkey from 'is-hotkey'
import { Editable, ReactEditor, useSlate } from 'slate-react'

import { useTextEditor } from './context'
import { toggleMark } from './utils'
import { Element } from './Element'
import { Leaf } from './Leaf'


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+shift+x': 'strikeThrough',
}


export const Input = () => {

  const {
    classes,
    readOnly,
    setIsFocused,
  } = useTextEditor()

  const editor = useSlate()
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

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
