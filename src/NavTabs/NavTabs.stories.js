import React from 'react'

import NavTab from '../NavTab'
import NavTabs from './NavTabs'

import HomeIcon from '@material-ui/icons/HomeRounded'
import ProjectsIcon from '@material-ui/icons/SquareFootRounded'
import PeopleIcon from '@material-ui/icons/PersonRounded'
import ContractsIcon from '@material-ui/icons/ArticleRounded'
import AddressBookIcon from '@material-ui/icons/ContactMailRounded'
import SettingsIcon from '@material-ui/icons/SettingsRounded'

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
