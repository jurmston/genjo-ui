import * as React from 'react'

import clsx from 'clsx'
import { Editor, Transforms } from 'slate'

import Button from '@material-ui/core/Button'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import LooksTwoIcon from '@material-ui/icons/LooksTwo'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'

import { useTextEditor } from './context'
import { ActionButton } from './ActionButton'


const LIST_TYPES = ['numbered-list', 'bulleted-list']

const MARK_FORMATS = [
  { value: 'bold', icon: FormatBoldIcon, label: 'Bold' },
  { value: 'italic', icon: FormatItalicIcon, label: 'Italic' },
  { value: 'underline', icon: FormatUnderlinedIcon, label: 'Underline' },
]

const BLOCK_FORMATS = [
  { value: 'heading-one', icon: LooksOneIcon, label: 'Heading 1' },
  { value: 'heading-two', icon: LooksTwoIcon, label: 'Heading 2' },
  { value: 'block-quote', icon: FormatQuoteIcon, label: 'Quote' },
  { value: 'numbered-list', icon: FormatListNumberedIcon, label: 'Numbered List' },
  { value: 'bulleted-list', icon: FormatListBulletedIcon, label: 'Bulletted List' },
]


export const ButtonPanel = () => {

  const {
    classes,
    editor,
    isFocused,
    handleSave,
    isDirty,
  } = useTextEditor()

  /** Returns `true` if the block is active. */
  function isBlockActive(block) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === block,
    })

    return !!match
  }

  /** Returns `true` if the mark is active. */
  function isMarkActive(mark) {
    const marks = Editor.marks(editor)
    return marks ? marks[mark] === true : false
  }

  /** Toggles an editor mark */
  function toggleMark(mark) {
    const isActive = isMarkActive(mark)

    if (isActive) {
      Editor.removeMark(editor, mark)
    } else {
      Editor.addMark(editor, mark, true)
    }
  }

  /** Toggles an editor block */
  function toggleBlock(block) {
    const isActive = isBlockActive(block)
    const isList = LIST_TYPES.includes(block)

    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : block,
    })

    if (!isActive && isList) {
      const block = { type: block, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  /** Adds a new divider block into the editor content. */
  function insertDivider() {
    const divider = {
      type: 'divider',
      children: [{ text: '' }],
    }

    const paragraph = {
      type: 'paragraph',
      children: [{ text: '' }],
    }

    Transforms.insertNodes(editor, divider)
    Transforms.insertNodes(editor, paragraph)
  }

  return (
    <div
      className={clsx(classes.buttons, isFocused && classes.isFocused)}
    >
        {/* Marks */}
        {MARK_FORMATS.map(mark => (
          <ActionButton
            key={mark.value}
            value={mark.value}
            label={mark.label}
            icon={mark.icon}
            onMouseDown={event => {
              event.preventDefault()
              toggleMark(mark.value)
            }}
          />
        ))}

        {/* Blocks */}
        {BLOCK_FORMATS.map(block => (
          <ActionButton
            key={block.value}
            value={block.value}
            label={block.label}
            icon={block.icon}
            onMouseDown={event => {
              event.preventDefault()
              toggleBlock(block.value)
            }}
          />
        ))}

        {/* Divider button */}
        <ActionButton
          icon={ViewAgendaIcon}
          label="Add Divider"
          onMouseDown={event => {
            event.preventDefault()
            insertDivider(editor)
          }}
        />

        <div style={{ flex: 1 }} />

        {Boolean(isDirty) && (
          <Button
            disabled={!isFocused || !isDirty}
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={handleSave}
          >
            Save
          </Button>
        )}
    </div>
  )
}
