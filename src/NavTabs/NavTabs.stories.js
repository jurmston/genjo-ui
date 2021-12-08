import React from 'react'

import NavTab from '../NavTab'
import { NavTabs } from './NavTabs'

import HomeIcon from '@mui/icons-material/HomeRounded'
import ProjectsIcon from '@mui/icons-material/SquareFootRounded'
import PeopleIcon from '@mui/icons-material/PersonRounded'
import ContractsIcon from '@mui/icons-material/ArticleRounded'
import AddressBookIcon from '@mui/icons-material/ContactMailRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
}

export const Primary = () => {
  const [tab, setTab] = React.useState(0)

  return (
    <div>
      <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
        <NavTab label="Home" />
        <NavTab label="Projects" />
        <NavTab label="People" />
        <NavTab label="Contracts" />
        <NavTab label="Address Book" />
        <NavTab label="Settings" />
      </NavTabs>

      <div style={{ marginTop: 32 }} />

      <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
        <NavTab label="Home" icon={<HomeIcon />} />
        <NavTab label="Projects" icon={<ProjectsIcon />} />
        <NavTab label="People" icon={<PeopleIcon />} />
        <NavTab label="Contracts" icon={<ContractsIcon />} />
        <NavTab label="Address Book" icon={<AddressBookIcon />} />
        <NavTab label="Settings" icon={<SettingsIcon />} />
      </NavTabs>
    </div>
  )
}
