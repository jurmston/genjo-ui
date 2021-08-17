import React from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { OptionsButtonMenu } from './OptionsButtonMenu'

import CloseIcon from '@material-ui/icons/CloseRounded'
import EditIcon from '@material-ui/icons/EditRounded'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

export default {
  title: 'Components/OptionsButtonMenu',
  component: OptionsButtonMenu,
}

export const Primary = () => {

  return (
    <StorybookTheme>
      <div style={{ display: 'flex', width: 300 }} onClick={() => alert('Container clicked')}>
        <div style={{ flex: 1 }}>Other content</div>
        <div>
          <OptionsButtonMenu
            actions={[
              {
                title: 'Update Subscription',
                icon: <EditIcon />,
                onClick: () => {},
              },
              {
                title: 'Cancel Subscription',
                icon: <CloseIcon />,
                onClick: () => {},
              },
            ]}
          >
            <MenuItem>Update Subscription</MenuItem>
            <MenuItem divider>Cancel Subscripton</MenuItem>
            <MenuItem>View Subscription</MenuItem>
          </OptionsButtonMenu>
        </div>
      </div>
    </StorybookTheme>
  )
}
