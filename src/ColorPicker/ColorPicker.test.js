import React from 'react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { ColorPicker } from './ColorPicker'

describe('Testing <ColorPicker />...', () => {

  it('should render with accessible label', () => {
    render(<ColorPicker id="test" label="Picker" onChange={() => {}} />)
    screen.getByLabelText('Picker')
  })
})
