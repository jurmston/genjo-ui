import React from 'react'
import { CurrencyField } from './CurrencyField'

export default {
  title: 'Components/CurrencyField',
  component: CurrencyField,
}

export const Main = ({ ...args }) => {
  const [value, setValue] = React.useState(0)

  return (
    <div style={{ width: 300 }}>
      <CurrencyField {...args} label="Controlled" value={value} onChange={(event, newValue) => setValue(newValue)} />
      {value}
    </div>
  )
}

Main.args = {
  currency: 'USD',
  locale: 'en-US',
  disableNegativeNumbers: false,
  shouldOverrideDecimalPlaces: false,
  decimalPlacesOverride: 0,
}
