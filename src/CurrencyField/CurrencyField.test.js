import React from 'react'
import { CurrencyField } from './CurrencyField'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('Testing <CurrencyField />...', () => {
  it('should render the output correctly', () => {
    const onChange = jest.fn()
    render(<CurrencyField onChange={onChange} value={1234567890} />)

    // The initial output should be '0.00'
    expect(screen.getByRole('textbox')).toHaveValue('12,345,678.90')

    // The default currency symbol should be in place
    const currencySymbol = screen.getByLabelText('currency symbol').textContent
    expect(currencySymbol).toBe('$')

    // Test that the event handler is firing
    userEvent.type(screen.getByRole('textbox'), '123456')
    expect(onChange).toHaveBeenCalledTimes(6)
  })

  it('should render zero as the empty string', () => {
    const onChange = jest.fn()
    render(<CurrencyField onChange={onChange} value={0} />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('should render negative numbers correctly', () => {
    const onChange = jest.fn()
    const { rerender } = render(<CurrencyField onChange={onChange} value={-1234567} />)
    expect(screen.getByRole('textbox')).toHaveValue('-12,345.67')

    rerender(<CurrencyField onChange={onChange} value={-1} />)
    expect(screen.getByRole('textbox')).toHaveValue('-0.01')
  })

  it('should toggle negative sign changes correctly', () => {
    let value = 1234567
    const onChange = jest.fn().mockImplementation((e, newValue) => {
      value = newValue
    })
    const { rerender } = render(<CurrencyField onChange={onChange} value={value} />)

    userEvent.type(screen.getByRole('textbox'), '-')
    rerender(<CurrencyField onChange={onChange} value={value} />)

    expect(screen.getByRole('textbox')).toHaveValue('-12,345.67')

    userEvent.type(screen.getByRole('textbox'), '8')
    rerender(<CurrencyField onChange={onChange} value={value} />)

    expect(screen.getByRole('textbox')).toHaveValue('-123,456.78')

    userEvent.type(screen.getByRole('textbox'), '-')
    rerender(<CurrencyField onChange={onChange} value={value} />)

    expect(screen.getByRole('textbox')).toHaveValue('123,456.78')
  })

  it('should toggle negative sign changes when the value is zero', () => {
    let value = 0
    const onChange = jest.fn().mockImplementation((e, newValue) => {
      value = newValue
    })
    const { rerender } = render(<CurrencyField onChange={onChange} value={value} />)

    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), '-')
    rerender(<CurrencyField onChange={onChange} value={value} />)
    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), '1')
    rerender(<CurrencyField onChange={onChange} value={value} />)
    expect(value).toBe(-1)
  })

  it('should render the correct decimal separator', () => {
    const onChange = jest.fn()

    render(<CurrencyField onChange={onChange} value={123456} decimalSeperator="?" />)

    expect(screen.getByRole('textbox')).toHaveValue('1,234?56')
  })

  it('should render the correct thousands separator', () => {
    const onChange = jest.fn()

    render(<CurrencyField onChange={onChange} value={123456} thousandsSeparator="?" />)

    expect(screen.getByRole('textbox')).toHaveValue('1?234.56')
  })


  it('should render zero decimal currencies correctly', () => {
    const onChange = jest.fn()

    render(<CurrencyField onChange={onChange} value={123456} currencySymbol="¥" decimalPlaces={0} />)

    expect(screen.getByRole('textbox')).toHaveValue('123,456')
  })

  it('should render the correct placeholder text', () => {
    const onChange = jest.fn()
    const { rerender } = render(<CurrencyField onChange={onChange} value={0} />)

    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument()

    userEvent.type(screen.getByRole('textbox'), '-')
    rerender(<CurrencyField onChange={onChange} value={0} />)
    expect(screen.getByPlaceholderText('-0.00')).toBeInTheDocument()

    // Check zero decimal
    userEvent.type(screen.getByRole('textbox'), '-')
    rerender(<CurrencyField onChange={onChange} value={0} decimalPlaces={0} />)
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
  })

  it('should render the correct currency symbol', () => {
    const onChange = jest.fn()
    render(<CurrencyField onChange={onChange} value={123456} currencySymbol="?" />)

    expect(screen.getByRole('textbox')).toHaveValue('1,234.56')

    // The default currency symbol should be in place
    const currencySymbol = screen.getByLabelText('currency symbol').textContent
    expect(currencySymbol).toBe('?')
  })

  it('should handle the initial value being a string', () => {
    let value = "25"
    const onChange = jest.fn().mockImplementation((e, newValue) => {
      value = newValue
    })

    render(<CurrencyField onChange={onChange} value={value} />)

    expect(screen.getByRole('textbox')).toHaveValue('0.25')

    userEvent.type(screen.getByRole('textbox'), '1')
    expect(value).toBe(251)
  })
})
