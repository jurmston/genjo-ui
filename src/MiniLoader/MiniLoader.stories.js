import React from 'react'

import { MiniLoader } from './MiniLoader'

export default {
  title: 'Components/MiniLoader',
  component: MiniLoader,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['grey.500', 'primary.main', 'secondary.main', 'success.main', 'info.main', 'warning.main', 'error.main'],
      },
    },
    width: {
      control: {
        type: 'range',
        min: 10,
        max: 100,
      },
    },
  },
}

export const Primary = ({ ...args }) => {
  return <MiniLoader {...args} />
}
