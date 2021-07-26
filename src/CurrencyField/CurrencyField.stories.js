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
      },
    },
  },
}

export const Main = ({ ...args }) => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 300 }}>
      <CurrencyField {...args} label="Controlled" value={value} onChange={(event, newValue) => setValue(newValue)} />
      {value}
    </div>
  )
}

Main.args = {
  currencySymbol: '$',
  decimalPlaces: 2,
  decimalSeperator: '.',
  thousandsSeperator: ',',
}
