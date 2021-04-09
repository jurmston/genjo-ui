import React from 'react'

import NavTab from '../NavTab'
import NavTabs from './NavTabs'

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
}

export const Primary = () => {
  const [tab, setTab] = React.useState(0)

  return (
    <NavTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
      <NavTab label="Home" />
      <NavTab label="Projects" />
      <NavTab label="People" />
      <NavTab label="Contracts" />
      <NavTab label="Address Book" />
      <NavTab label="Settings" />
    </NavTabs>
  )
}
