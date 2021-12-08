import * as React from 'react'
import PropTypes from 'prop-types'

import Menu from '@mui/material/Menu'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/HelpRounded'
import useOpenable from '../useOpenable'

import { marks, blocks, actions } from './actions'
import { renderHotkey } from './utils'


export function HelpMenu() {
  const [isOpen, { close, toggle }] = useOpenable()
  const ref = React.useRef()

  return (
    <>
      <IconButton
        onClick={toggle}
        ref={ref}
      >
        <HelpIcon />
      </IconButton>
      <Menu
        disablePortal
        open={isOpen}
        onClose={close}
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <ListSubheader>Keyboard Shortcuts</ListSubheader>
        <Divider />

        {marks.map(mark => (
          <ListItem key={mark.value}>
            <ListItemIcon>
              {<mark.icon />}
            </ListItemIcon>
            <ListItemText>{mark.label}</ListItemText>
            <ListItemText sx={{ ml: 3, textAlign: 'right' }}>
              <Chip sx={{ fontWeight: 'medium' }} label={renderHotkey(mark.hotkey)} />
            </ListItemText>
          </ListItem>
        ))}

        <Divider />

        {blocks.map(block => (
          <ListItem key={block.value}>
            <ListItemIcon>
              {<block.icon />}
            </ListItemIcon>
            <ListItemText>{block.label}</ListItemText>
            <ListItemText sx={{ ml: 3, textAlign: 'right' }}>
              <Chip sx={{ fontWeight: 'medium' }} label={renderHotkey(block.hotkey)} />
            </ListItemText>
          </ListItem>
        ))}

        <Divider />

        {actions.map(action => (
          <ListItem key={action.value}>
            <ListItemIcon>
              {<action.icon />}
            </ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
            <ListItemText sx={{ ml: 3, textAlign: 'right' }}>
              <Chip sx={{ fontWeight: 'medium' }} label={renderHotkey(action.hotkey)} />
            </ListItemText>
          </ListItem>
        ))}
      </Menu>
    </>
  )
}

HelpMenu.propTypes = {

}
