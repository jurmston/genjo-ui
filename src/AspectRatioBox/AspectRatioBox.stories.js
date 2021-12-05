import React from 'react'

import { AspectRatioBox } from './AspectRatioBox'
import { shadows } from '../ThemeProvider'

export default {
  title: 'Components/AspectRatioBox',
  component: AspectRatioBox,
  argTypes: {

  }
}

export const Primary = ({ ...args }) => {
  return (
    <div style={{ maxWidth: 500, border: '1px solid black', padding: 16 }}>
      <AspectRatioBox
        {...args}
      >
        <img
          alt="Random result from Unsplash"
          src="https://source.unsplash.com/random"
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            borderRadius: 4,
            boxShadow: shadows[8],
          }}
        />
      </AspectRatioBox>
    </div>
  )
}

Primary.args = {
  aspectRatio: 1,
}
