import React from 'react'

import { DateRangePicker } from './DateRangePicker'
import { colors, colorsLight } from '../colors'

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
}

export const Primary = () => {
  const [value, setValue] = React.useState(null)

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
    />
  )
}
