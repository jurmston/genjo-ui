import React from 'react'
import { render } from '@testing-library/react'
import { MenuPanelItem } from './MenuPanelItem'

describe('Testing <MenuPanelItem />...', () => {
  it('should not explode', () => {
    render(
      <MenuPanelItem title="main menu item">
        <MenuPanelItem title="submenu item" />
      </MenuPanelItem>
    )
  })
})
