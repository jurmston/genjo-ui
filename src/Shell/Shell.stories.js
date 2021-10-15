import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import DeviceProvider from '../DeviceProvider'
import MenuPanelItem from '../MenuPanelItem'
import NavTab from '../NavTab'
import NavTabs from '../NavTabs'

import Shell from './Shell'
import useShell from './useShell'
import story_logo from './story_logo.svg'

import HomeIcon from '@mui/icons-material/HomeRounded'
import ProjectsIcon from '@mui/icons-material/SquareFootRounded'
import PeopleIcon from '@mui/icons-material/PersonRounded'
import ContractsIcon from '@mui/icons-material/ArticleRounded'
import AddressBookIcon from '@mui/icons-material/ContactMailRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'

import UserMenu from '../UserMenu'

export default {
  title: 'Widgets/Shell',
  component: Shell,
}

const PageWithMenu = ({ setPage, toggleAvatar, toggleLogo }) => {
  const [contentKey, setContentKey] = React.useState('Apple')
  const menuContent = (
    <>
      <MenuPanelItem icon={<ArrowBackIcon />} title="Back to Dashboard" isSelected={false} />
      <MenuPanelItem title={contentKey} />
      <MenuPanelItem title="Nested">
        <MenuPanelItem title="Noodles" />
      </MenuPanelItem>
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
      <MenuPanelItem title="Content" />
    </>
  )

  useShell({ menuContent, deps: [contentKey] })

  function toggleContent() {
    setContentKey(contentKey === 'Apple' ? 'Banana' : 'Apple')
  }

  return (
    <Container>
      <Typography variant="h1">Website Content</Typography>

      <Typography>This is my website. Roar.</Typography>

      <Button variant="contained" color="primary" onClick={() => setPage('no-menu')}>
        Without Menu
      </Button>

      <div style={{ margin: 16 }} />

      <Button variant="contained" color="primary" onClick={toggleContent}>
        Change menu content
      </Button>

      <div style={{ margin: 16 }} />

      <Button variant="contained" color="primary" onClick={toggleAvatar}>
        Toggle Avatar
      </Button>

      <div style={{ margin: 16 }} />

      <Button variant="contained" color="primary" onClick={toggleLogo}>
        Toggle Logo
      </Button>
    </Container>
  )
}

const PageWithoutMenu = ({ setPage, toggleAvatar, toggleLogo }) => {
  useShell({})

  return (
    <Container>
      <Typography variant="h1">Website Content</Typography>

      <Typography>This is my website. Roar.</Typography>

      <Button variant="contained" color="primary" onClick={() => setPage('menu')}>
        With Menu
      </Button>

      <div style={{ margin: 16 }} />

      <Button variant="contained" color="primary" onClick={toggleAvatar}>
        Toggle Avatar
      </Button>

      <div style={{ margin: 16 }} />

      <Button variant="contained" color="primary" onClick={toggleLogo}>
        Toggle Logo
      </Button>
    </Container>
  )
}

export const Main = () => {
  const [page, setPage] = React.useState('menu')
  const [tab, setTab] = React.useState(0)
  const [hasLogo, setHasLogo] = React.useState(true)

  const [avatarOnly, setAvatarOnly] = React.useState(false)

  function toggleAvatar() {
    setAvatarOnly(s => !s)
  }

  function toggleLogo() {
    setHasLogo(s => !s)
  }

  return (
    <DeviceProvider>
      <Shell
        logo={hasLogo ? story_logo : undefined}
        brandName="Genjo UI"
        homeLink="https://www.example.com"
        mobileNavigationActions
        userMenu={
          <UserMenu
            avatarOnly={avatarOnly}
            initials="JU"
            name="colleen.camenisch@gmail.com"
            color="darkgreen"
          >
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
          </UserMenu>
        }
        mobileUserMenu={
          <UserMenu
            avatarOnly={avatarOnly}
            height={47}
            initials="JU"
            color="darkgreen"
          >
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
          </UserMenu>
        }

        mobileNavigation={
          <BottomNavigation showLabels value={tab} onChange={(event, newValue) => setTab(newValue)}>
            <BottomNavigationAction label="Projects" icon={<ProjectsIcon />} />
            <BottomNavigationAction label="People" icon={<PeopleIcon />} />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
          </BottomNavigation>
        }

        appBarContent={
          <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
            <NavTab label="Projects" icon={<ProjectsIcon />} />
            <NavTab label="People" icon={<PeopleIcon />} />
            <NavTab label="Settings" icon={<SettingsIcon />} />
          </NavTabs>
        }
      >
        {page === 'menu' ? (
          <PageWithMenu setPage={setPage} toggleAvatar={toggleAvatar} toggleLogo={toggleLogo} />
        ) : (
          <PageWithoutMenu setPage={setPage} toggleAvatar={toggleAvatar} toggelLogo={toggleLogo} />
        )}
      </Shell>
    </DeviceProvider>
  )
}
