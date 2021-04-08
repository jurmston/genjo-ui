import * as React from 'react'
import { render } from '@testing-library/react'

import { MiniLoader } from './MiniLoader'

describe('Testing <MiniLoader />...', () => {
  it('should not explode', () => {
    render(<MiniLoader />)
  })
})
