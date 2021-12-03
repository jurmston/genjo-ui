import React from 'react'

import { DateRangePicker } from './DateRangePicker'

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
