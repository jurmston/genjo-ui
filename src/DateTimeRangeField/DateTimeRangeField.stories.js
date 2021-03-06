import React from 'react'

import { DateTimeRangeField } from './DateTimeRangeField'

export default {
  title: 'Components/DateTimeRangeField',
  component: DateTimeRangeField,
}

export const Primary = () => {
  const [values, setValues] = React.useState({ start: null, end: null })

  const error = values.start > values.end

  return (
    <DateTimeRangeField
      start={values.start}
      end={values.end}
      onChange={(start, end) => setValues({ start, end })}
      error={error}
      helperText={error ? 'Start must be before end' : ''}
    />
  )
}
