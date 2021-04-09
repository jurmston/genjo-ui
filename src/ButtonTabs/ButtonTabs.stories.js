import React from 'react'

import ButtonTab from '../ButtonTab'
import ButtonTabs from './ButtonTabs'

export default {
  title: 'Components/ButtonTabs',
  component: ButtonTabs,
}

export const Primary = () => {
  const [tab, setTab] = React.useState(0)

  return (
    <ButtonTabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
      <ButtonTab label="Home" />
      <ButtonTab label="Projects" />
      <ButtonTab label="People" />
      <ButtonTab label="Contracts" />
      <ButtonTab label="Address Book" />
      <ButtonTab label="Settings" />
    </ButtonTabs>
  )
}
