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

import HomeIcon from '@material-ui/icons/HomeRounded'
import ProjectsIcon from '@material-ui/icons/SquareFootRounded'
import PeopleIcon from '@material-ui/icons/PersonRounded'
import ContractsIcon from '@material-ui/icons/ArticleRounded'
import AddressBookIcon from '@material-ui/icons/ContactMailRounded'
import SettingsIcon from '@material-ui/icons/SettingsRounded'

import UserMenu from '../UserMenu'

export default {
  title: 'Widgets/Shell',
  component: Shell,
}

const PageWithMenu = ({ setPage, toggleAvatar }) => {
  const [contentKey, setContentKey] = React.useState('Apple')
  const menuContent = (
    <>
      <MenuPanelItem icon={<ArrowBackIcon />} title="Back to Dashboard" isSelected={false} />
      <MenuPanelItem title={contentKey} />
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
        ToggleAvatar
      </Button>
    </Container>
  )
}

const PageWithoutMenu = ({ setPage, toggleAvatar }) => {
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
        ToggleAvatar
      </Button>
    </Container>
  )
}

export const Main = () => {
  const [page, setPage] = React.useState('menu')
  const [tab, setTab] = React.useState(0)

  const [avatarOnly, setAvatarOnly] = React.useState(false)

  function toggleAvatar() {
    setAvatarOnly(!avatarOnly)
  }

  return (
    <Shell
      logo={story_logo}
      brandName="Genjo UI"
      homeLink="https://www.example.com"
      userMenu={
        <UserMenu
          avatarOnly={avatarOnly}
          initials="JU"
          name="jeff@example.com"
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
      appBarContent={
        <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
          <NavTab label="Projects" icon={<ProjectsIcon />} />
          <NavTab label="People" icon={<PeopleIcon />} />
          <NavTab label="Settings" icon={<SettingsIcon />} />
        </NavTabs>
      }
    >
      {page === 'menu' ? (
        <PageWithMenu setPage={setPage} toggleAvatar={toggleAvatar} />
      ) : (
        <PageWithoutMenu setPage={setPage} toggleAvatar={toggleAvatar} />
      )}
    </Shell>
  )
}
