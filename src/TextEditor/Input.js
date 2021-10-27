import * as React from 'react'
import PropTypes from 'prop-types'

import isHotkey from 'is-hotkey'
import { Editable, useSlate } from 'slate-react'

import useTextEditor from './useTextEditor'
import { toggleMark } from './utils'
import { Element } from './Element'
import { Leaf } from './Leaf'

import { useMessageStyles } from './styles'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+shift+x': 'strikeThrough',
}

export const Input = ({ minHeight, maxHeight }) => {
  const { readOnly, setIsFocused } = useTextEditor()

  const messageClasses = useMessageStyles({ minHeight, maxHeight })

  const editor = useSlate()
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  const messageRef = React.useRef()

  return (
    <div
      className={messageClasses.message}
      ref={messageRef}
    >
      <Editable
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={event => {
          // The psuedo-input created by slate-js does not automatically
          // scroll to the cursor position when it goes below the message
          // window boundy.
          const selection = window.getSelection().getRangeAt(0)

          // Capture the bounding rect for the cursor selection.
          const {
            bottom = 0,
          } = selection?.getBoundingClientRect() ?? {}

          // This is the height of the visible window (possibly bounded by
          // minHeight and maxHeight in props)
          const clientHeight = messageRef.current?.clientHeight ?? 0

          // This is the position of the scroll container
          const scrollTop = messageRef.current?.scrollTop ?? 0

          // The selections bottom is relative to the visible window. If this
          // delta is greater than the clientHeight then we are outside the
          // visible window. This captures how far below the visible window
          // we are.
          const scrollDelta = Math.max(0, bottom - clientHeight)

          if (scrollDelta) {
            messageRef.current?.scroll(0, scrollTop + scrollDelta)
          }

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

Input.propTypes = {
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
}
