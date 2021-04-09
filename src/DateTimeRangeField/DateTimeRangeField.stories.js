import React from 'react'

import { DateTimeRangeField } from './DateTimeRangeField'

export default {
  title: 'Components/DateTimeRangeField',
  component: DateTimeRangeField,
}

export const Primary = () => {
  const [values, setValues] = React.useState({ start: null, end: null })

  return (
    <DateTimeRangeField start={values.start} end={values.end} onChange={(start, end) => setValues({ start, end })} />
  )
}
