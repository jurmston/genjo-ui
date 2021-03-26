import React from 'react'

import { DateField } from './DateField'

export default {
  title: 'Components/DateField',
  component: DateField,
}

export const Main = () => {
  const [value, setValue] = React.useState(null)

  return (
    <div style={{ width: 300 }}>
      <DateField
        label="Start Date"
        variant="filled"
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
