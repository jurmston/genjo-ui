import * as React from 'react'

import { Editor } from 'slate'
import { useSlate } from 'slate-react'

import Box from '@mui/material/Box'
import useTextEditor from './useTextEditor'
import { HelpMenu } from './HelpMenu'
import { toggleMark, toggleBlock, isBlockActive, isMarkActive } from './utils'
import { isLinkActive } from './plugins/links'
import { marks, blocks, actions } from './actions'
import ColorPicker from '../ColorPicker'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ColorIcon from '@mui/icons-material/FormatColorTextRounded'
import BackgroundColorIcon from '@mui/icons-material/FormatColorFillRounded'

import { renderHotkey } from './utils'

import { colors } from '../ThemeProvider'


const textPrimary = 'rgba(0, 0, 0, 0.87)'
const transparentBackground = 'rgba(0, 0, 0, 0)'


const textColors = [
  // Grayscale
  textPrimary,
  colors.stone[800],
  colors.stone[600],
  colors.stone[400],
  colors.stone[200],
  '#fff',

  // Colors
  colors.stone[700],
  colors.red[700],
  colors.orange[700],
  colors.amber[700],
  colors.yellow[700],
  colors.lime[700],
  colors.green[700],
  colors.emerald[700],
  colors.teal[700],
  colors.cyan[700],
  colors.sky[700],
  colors.blue[700],
  colors.indigo[700],
  colors.violet[700],
  colors.purple[700],
  colors.fuchsia[700],
  colors.pink[600],
  colors.rose[500],
]

const bgColors = [
  // Colors
  transparentBackground,
  '#000',
  colors.red[300],
  colors.orange[300],
  colors.amber[300],
  colors.yellow[300],
  colors.lime[300],
  colors.green[300],
  colors.emerald[300],
  colors.teal[300],
  colors.cyan[300],
  colors.sky[300],
  colors.blue[300],
  colors.indigo[300],
  colors.violet[300],
  colors.purple[300],
  colors.fuchsia[300],
  colors.pink[300],
]


const PanelDivider = () => {
  return (
    <Box
      sx={{
        my: -0.5,
        pl: 0.5,
        mr: 1,
        borderRight: 1,
        borderRightColor: 'divider',
        height: 37,
      }}
    />
  )
}



export const ButtonPanel = () => {

  const { isFocused, toggleLink, buttonPanelPosition } = useTextEditor()

  const editor = useSlate()

  function handleMarkEvent(event, value) {
    event.preventDefault()
    toggleMark(editor, value)
  }

  function handleBlockEvent(event, value) {
    event.preventDefault()
    toggleBlock(editor, value)
  }

  const handleLinkEvent = React.useCallback(
    event => {
      event.preventDefault()
      toggleLink()
    },
    [toggleLink]
  )

  const handleHistoryEvent = React.useCallback(
    (event, type = 'undo') => {
      event.preventDefault()
      editor?.[type]?.()
    },
    [editor]
  )

  const actionValues = ({
    link: {
      onMouseDown: handleLinkEvent,
      isActive: isLinkActive(editor),
    },
    undo: {
      onMouseDown: event => handleHistoryEvent(event, 'undo'),
      isActive: editor.history?.undos?.length > 0,
    },
    redo: {
      onMouseDown: event => handleHistoryEvent(event, 'redo'),
      isActive: editor.history?.redos?.length > 0,
    },
  })

  const currentMarks = Editor.marks(editor)

  const borderProps = React.useMemo(
    () => buttonPanelPosition === 'bottom'
      ? { borderTop: 1, borderTopColor: 'divider' }
      : { borderBottom: 1, borderBottomColor: 'divider' },
    [buttonPanelPosition],
  )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap',
        ...borderProps,
        padding: 0.5,
        backgroundColor: isFocused ? 'grey.100' : 'background.default',
      }}
    >
      {/* Blocks */}
      {blocks.map(block => (
        <Tooltip title={`${block.label} | ${renderHotkey(block.hotkey)}`} key={block.value}>
          <IconButton
            sx={{ mr: 0.5 }}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            color={isBlockActive(editor, block.value) ? 'primary' : 'default'}
            aria-label={block.label}
            icon={block.icon}
            onMouseDown={event => handleBlockEvent(event, block.value)}
          >
            <block.icon />
          </IconButton>
        </Tooltip>
      ))}

      <PanelDivider />

      {/* Marks */}
      {marks.map(mark => (
        <Tooltip title={`${mark.label} | ${renderHotkey(mark.hotkey)}`} key={mark.value}>
          <IconButton
            sx={{ mr: 0.5 }}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            color={isMarkActive(editor, mark.value) ? 'primary' : 'default'}
            aria-label={mark.label}
            icon={mark.icon}
            onMouseDown={event => handleMarkEvent(event, mark.value)}
          >
            <mark.icon />
          </IconButton>
        </Tooltip>
      ))}

      <PanelDivider />

      <ColorPicker
        value={currentMarks?.color ?? '#000'}
        onChange={value => toggleMark(editor, 'color', value)}
        colors={textColors}
      >
        <IconButton
          sx={{ color: currentMarks?.color ?? '#000' }}
        >
          <ColorIcon />
        </IconButton>
      </ColorPicker>

      <Box sx={{ mr: 0.5 }} />

      <ColorPicker
        value={currentMarks?.bgcolor ?? '#000'}
        onChange={value => toggleMark(editor, 'bgcolor', value)}
        colors={bgColors}
      >
        <IconButton
          sx={{ color: currentMarks?.bgcolor === transparentBackground
            ? '#000'
            : (currentMarks?.bgcolor ?? '#000') }}
        >
          <BackgroundColorIcon />
        </IconButton>
      </ColorPicker>

      <Box sx={{ mr: 0.5 }} />

      <PanelDivider />

      {actions.map(action => {
        const { onMouseDown, isActive, } = actionValues[action.value]
        return (
          <Tooltip title={`${action.label} | ${renderHotkey(action.hotkey)}`} key={action.value}>
            <IconButton
              sx={{ mr: 0.5 }}
              disableRipple
              disableFocusRipple
              disableTouchRipple
              color={isActive ? 'primary' : 'default'}
              aria-label={action.label}
              onMouseDown={onMouseDown}
            >
              <action.icon />
            </IconButton>
          </Tooltip>
        )
      })}



      <div style={{ flex: 1 }} />

      <HelpMenu />
    </Box>
  )
}
