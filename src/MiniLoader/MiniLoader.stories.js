import React from 'react'

import { MiniLoader } from './MiniLoader'

export default {
  title: 'Components/MiniLoader',
  component: MiniLoader,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['default', 'primary', 'secondary']
      }
    },
    width: {
      control: {
        type: 'range',
        min: 10,
        max: 100,
      }
    }
  }
}

export const Primary = ({ ...args }) => {

  return (
    <MiniLoader {...args} />
  )
}
