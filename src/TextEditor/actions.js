import FormatBoldIcon from '@mui/icons-material/FormatBoldRounded'
import FormatItalicIcon from '@mui/icons-material/FormatItalicRounded'
import FormatUnderlined from '@mui/icons-material/FormatUnderlinedRounded'
import LooksOneIcon from '@mui/icons-material/LooksOneRounded'
import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded'
import FormatQuoteIcon from '@mui/icons-material/FormatQuoteRounded'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumberedRounded'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulletedRounded'
import ChecklistIcon from '@mui/icons-material/CheckBoxRounded'
import LinkIcon from '@mui/icons-material/LinkRounded'
import UndoIcon from '@mui/icons-material/UndoRounded'
import RedoIcon from '@mui/icons-material/RedoRounded'


export const marks = [
  { value: 'bold', icon: FormatBoldIcon, label: 'Bold', hotkey: 'mod+b' },
  { value: 'italic', icon: FormatItalicIcon, label: 'Italic', hotkey: 'mod+i' },
  { value: 'underline', icon: FormatUnderlined, label: 'Underline', hotkey: 'mod+u' },
]


export const blocks = [
  {
    value: 'heading-one',
    icon: LooksOneIcon,
    label: 'Heading 1',
    hotkey: 'mod+option+1',
  },
  {
    value: 'heading-two',
    icon: LooksTwoIcon,
    label: 'Heading 2',
    hotkey: 'mod+option+2',
  },
  {
    value: 'block-quote',
    icon: FormatQuoteIcon,
    label: 'Quote',
    hotkey: 'mod+option+3',
  },
  {
    value: 'numbered-list',
    icon: FormatListNumberedIcon,
    label: 'Numbered List',
    hotkey: 'mod+shift+7',
  },
  {
    value: 'bulleted-list',
    icon: FormatListBulletedIcon,
    label: 'Bulletted List',
    hotkey: 'mod+shift+8',
  },
  {
    value: 'checklist',
    icon: ChecklistIcon,
    label: 'Checklist',
    hotkey: 'mod+shift+9',
  },
]


export const actions = [
  {
    value: 'link',
    icon: LinkIcon,
    label: 'Toggle Link',
    hotkey: 'mod+shift+l',
  },
  {
    value: 'undo',
    icon: UndoIcon,
    label: 'Undo',
    hotkey: 'mod+z',
  },
  {
    value: 'redo',
    icon: RedoIcon,
    label: 'Redo',
    hotkey: 'mod+shift+z',
  },
]
