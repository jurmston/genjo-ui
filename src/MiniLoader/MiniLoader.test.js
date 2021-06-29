import * as React from 'react'
import { renderWithCustomTheme } from '../test-utils'

import { MiniLoader } from './MiniLoader'

describe('Testing <MiniLoader />...', () => {
  it('should not explode', () => {
    renderWithCustomTheme(<MiniLoader />)
  })
})
