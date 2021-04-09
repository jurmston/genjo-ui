import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import MenuPanelItem from '../MenuPanelItem'
import NavTab from '../NavTab'
import NavTabs from '../NavTabs'

import Shell from './Shell'
import useShell from './useShell'
import story_logo from './story_logo.svg'

export default {
  title: 'Widgets/Shell',
  component: Shell,
}

const PageWithMenu = ({ setPage }) => {
  const menuContent = <MenuPanelItem icon={<ArrowBackIcon />} title="Back to Dashboard" isSelected={false} />

  useShell({ menuContent })

  return (
    <Container>
      <Typography variant="h1">Website Content</Typography>

      <Typography>This is my website. Roar.</Typography>

      <Button variant="contained" color="primary" onClick={() => setPage('no-menu')}>
        Without Menu
      </Button>
    </Container>
  )
}

const PageWithoutMenu = ({ setPage }) => {
  useShell({})

  return (
    <Container>
      <Typography variant="h1">Website Content</Typography>

      <Typography>This is my website. Roar.</Typography>

      <Button variant="contained" color="primary" onClick={() => setPage('menu')}>
        With Menu
      </Button>
    </Container>
  )
}

export const Main = () => {
  const [page, setPage] = React.useState('menu')
  const [tab, setTab] = React.useState(0)

  return (
    <Shell
      logo={story_logo}
      brandName="Trensite"
      userMenuContent={
        <List>
          <MenuItem>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </MenuItem>

          <MenuItem divider>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My profile" />
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </List>
      }
      appBarContent={
        <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
          <NavTab label="Projects" />
          <NavTab label="People" />
          <NavTab label="Settings" />
        </NavTabs>
      }
    >
      {page === 'menu' ? <PageWithMenu setPage={setPage} /> : <PageWithoutMenu setPage={setPage} />}
    </Shell>
  )
}
