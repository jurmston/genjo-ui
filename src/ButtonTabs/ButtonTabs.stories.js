import React from 'react'

import TextField from '@material-ui/core/TextField'

import ButtonTab from '../ButtonTab'
import ButtonTabs from './ButtonTabs'

export default {
  title: 'Components/ButtonTabs',
  component: ButtonTabs,
}

export const Primary = () => {
  const [tab, setTab] = React.useState(0)
  const [tab2, setTab2] = React.useState(0)

  return (
    <div style={{ width: 500 }}>
      <ButtonTabs
        value={tab}
        onChange={(event, newTab) => setTab(newTab)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <ButtonTab label="Home" />
        <ButtonTab label="Projects" />
        <ButtonTab label="People" />
        <ButtonTab label="Contracts" />
        <ButtonTab label="Address Book" />
        <ButtonTab label="Settings" />
      </ButtonTabs>

      <div style={{ marginTop: 32}} />

      <TextField
        label="Test Field"
        placeholder="I'm here to compare styles..."
      />

      <div style={{ marginTop: 32}} />

      <ButtonTabs
        value={tab2}
        onChange={(event, newTab) => setTab2(newTab)}
        centered
        variant="fullWidth"
      >
        <ButtonTab label="Dashboard" />
        <ButtonTab label="Tasks" />
        <ButtonTab label="Messages" />
      </ButtonTabs>
    </div>
  )
}
