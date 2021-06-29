import React from 'react'
import { MenuPanelItem } from './MenuPanelItem'
import { renderWithCustomTheme } from '../test-utils'


describe('Testing <MenuPanelItem />...', () => {
  it('should not explode', () => {
    renderWithCustomTheme(
      <MenuPanelItem title="main menu item">
        <MenuPanelItem title="submenu item" />
      </MenuPanelItem>
    )
  })
})
