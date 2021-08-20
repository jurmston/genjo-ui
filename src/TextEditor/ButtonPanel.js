import * as React from 'react'

import clsx from 'clsx'
import { useSlate } from 'slate-react'

import Button from '@material-ui/core/Button'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import LooksTwoIcon from '@material-ui/icons/LooksTwo'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough'
import LinkIcon from '@material-ui/icons/Link'

import useTextEditor from './useTextEditor'
import { ActionButton } from './ActionButton'
import { toggleMark, toggleBlock, isBlockActive, isMarkActive } from './utils'
import { LinkDialog } from './LinkDialog'

import { isLinkActive, unwrapLink } from './plugins/links'

const MARK_FORMATS = [
  { value: 'bold', icon: FormatBoldIcon, label: 'Bold' },
  { value: 'italic', icon: FormatItalicIcon, label: 'Italic' },
  {
    value: 'strikethrough',
    icon: FormatStrikethroughIcon,
    label: 'Strikethrough',
  },
]

const BLOCK_FORMATS = [
  { value: 'heading-one', icon: LooksOneIcon, label: 'Heading 1' },
  { value: 'heading-two', icon: LooksTwoIcon, label: 'Heading 2' },
  { value: 'block-quote', icon: FormatQuoteIcon, label: 'Quote' },
  {
    value: 'numbered-list',
    icon: FormatListNumberedIcon,
    label: 'Numbered List',
  },
  {
    value: 'bulleted-list',
    icon: FormatListBulletedIcon,
    label: 'Bulletted List',
  },
]

export const ButtonPanel = () => {
  const [linkSelection, setLinkSelection] = React.useState(null)

  const { classes, isFocused } = useTextEditor()

  const editor = useSlate()

  return (
    <div className={clsx(classes.buttons, isFocused && classes.isFocused)}>
      {/* Marks */}
      {MARK_FORMATS.map(mark => (
        <ActionButton
          key={mark.value}
          isActive={isMarkActive(editor, mark.value)}
          value={mark.value}
          label={mark.label}
          icon={mark.icon}
          onMouseDown={event => {
            event.preventDefault()
            toggleMark(editor, mark.value)
          }}
        />
      ))}

      {/* Blocks */}
      {BLOCK_FORMATS.map(block => (
        <ActionButton
          key={block.value}
          isActive={isBlockActive(editor, block.value)}
          value={block.value}
          label={block.label}
          icon={block.icon}
          onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor, block.value)
          }}
        />
      ))}

      {/* Link Button */}
      <ActionButton
        icon={LinkIcon}
        isActive={isLinkActive(editor)}
        label="Add Link"
        onMouseDown={event => {
          event.preventDefault()
          if (isLinkActive(editor)) {
            unwrapLink(editor)
          } else {
            setLinkSelection(editor.selection)
          }
        }}
      />

      <div style={{ flex: 1 }} />

      <LinkDialog
        isOpen={Boolean(linkSelection)}
        selection={linkSelection}
        onClose={() => setLinkSelection(null)}
      />
    </div>
  )
}
