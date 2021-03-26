import React from 'react'
import { CurrencyField } from './CurrencyField'

export default {
  title: 'Components/CurrencyField',
  component: CurrencyField,
  argTypes: {
    variant: {
      defaultValue: 'filled',
      control: {
        type: 'select',
        options: ['filled', 'standard', 'outlined'],
      }
    },
  }
}

export const Main = ({ variant, ...args }) => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 300 }}>
      <CurrencyField
        {...args}
        variant={variant}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      />
    </div>
  )
}

Main.args = {
  label: 'Currency Value',
  symbol: '$',
}
