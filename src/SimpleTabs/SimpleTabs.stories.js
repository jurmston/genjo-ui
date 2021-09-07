import React from 'react'

import StarIcon from '@material-ui/icons/StarRounded'
import SimpleTab from '../SimpleTab'
import { SimpleTabs } from './SimpleTabs'


export default {
  title: 'Components/SimpleTabs',
}

export const Primary = () => {
  const [tab, setTab] = React.useState(0)

  function handleTabChange(event, newTab) {
    setTab(newTab)
  }

  return (
    <div>
      <SimpleTabs value={tab} onChange={handleTabChange}>
        <SimpleTab label="Active" />
        <SimpleTab label="Planning" />
        <SimpleTab label="Closed" />
        <SimpleTab label="All" />
        <SimpleTab label="Starred" icon={<StarIcon />} />
      </SimpleTabs>
    </div>
  )
}
