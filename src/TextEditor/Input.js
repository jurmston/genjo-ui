import * as React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import isHotkey from 'is-hotkey'
import { Editable, useSlate, ReactEditor } from 'slate-react'

import useTextEditor from './useTextEditor'
import { toggleMark, toggleBlock } from './utils'
import { Element } from './Element'
import { Leaf } from './Leaf'
import { getTextSx } from './styles'


const MARK_HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

const BLOCK_HOTKEYS = {
  'mod+option+1': 'heading-one',
  'mod+option+2': 'heading-two',
  'mod+option+3': 'block-quote',
  'mod+shift+7': 'numbered-list',
  'mod+shift+8': 'bulleted-list',
  'mod+shift+9': 'checklist',
}

export const Input = ({ minHeight, maxHeight }) => {
  const { readOnly, toggleLink, variant } = useTextEditor()

  const editor = useSlate()
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  const messageRef = React.useRef()

  const sx = React.useMemo(
    () => getTextSx({ minHeight, maxHeight, variant }),
    [minHeight, maxHeight]
  )

  return (
    <Box
      ref={messageRef}
      sx={sx}
    >
      <Editable
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
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

          for (const hotkey in MARK_HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = MARK_HOTKEYS[hotkey]
              toggleMark(editor, mark)
              return
            }
          }

          for (const hotkey in BLOCK_HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const block = BLOCK_HOTKEYS[hotkey]
              toggleBlock(editor, block)
              return
            }
          }

          if (isHotkey('mod+shift+l', event)) {
            event.preventDefault()
            toggleLink()
          }


        }}
      />
    </Box>
  )
}

Input.propTypes = {
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
}
