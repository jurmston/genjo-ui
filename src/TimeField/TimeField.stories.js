import React from 'react'

import { TimeField } from './TimeField'

export default {
  title: 'Components/TimeField',
  component: TimeField,
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
      <TimeField
        label="Start Time"
        variant="filled"
        value={value}
        onChange={setValue}
        hasDialog={args.hasDialog}
      />
    </div>
  )
}
