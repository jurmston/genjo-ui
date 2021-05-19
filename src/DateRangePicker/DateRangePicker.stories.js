import React from 'react'

import { DateRangePicker } from './DateRangePicker'
import { colors, colorsLight } from '../styles'

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
}

export const Primary = () => {
  const [value, setValue] = React.useState({
    start: null,
    end: null,
  })

  return <DateRangePicker start={value.start} end={value.end} onChange={setValue} />
}
