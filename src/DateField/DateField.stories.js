import React from 'react'
import { DateTime } from 'luxon'
import { DateField } from './DateField'

export default {
  title: 'Components/DateField',
  component: DateField,
  argTypes: {
    hasDialog: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Main = ({ ...args }) => {
  const [value, setValue] = React.useState(null)

  return (
    <div style={{ width: 300 }}>
      <DateField
        label="Start Date"
        value={value}
        onChange={setValue}
        hasDialog={args.hasDialog}
        DatePickerProps={{
          minDate: DateTime.now().plus({ days: 3 }),
          maxDate: DateTime.now().plus({ days: 10 }),
        }}
      />
    </div>
  )
}
