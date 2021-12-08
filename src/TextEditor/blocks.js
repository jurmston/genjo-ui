import LooksOneIcon from '@mui/icons-material/LooksOneRounded'
import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded'
import FormatQuoteIcon from '@mui/icons-material/FormatQuoteRounded'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumberedRounded'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulletedRounded'


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
]