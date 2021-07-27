import React from 'react'
import { DateTime } from 'luxon'
import { DateField, DEFAULT_FORMAT } from './DateField'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('Testing <DateField />...', () => {
  it('should render the output correctly', () => {
    const onChange = jest.fn()
    const date = DateTime.local()
    render(<DateField onChange={onChange} value={date} />)

    expect(screen.getByRole('textbox')).toHaveValue(date.toLocaleString(DEFAULT_FORMAT))
  })
})