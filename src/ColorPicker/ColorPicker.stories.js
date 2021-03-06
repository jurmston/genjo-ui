import React from 'react'

import { ColorPicker } from './ColorPicker'
import { colors, colorsLight } from '../ThemeProvider/colors'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
}

export const Primary = () => {
  const [color, setColor] = React.useState(colors.blue[500])

  return (
    <StorybookTheme>
      <ColorPicker value={color} onChange={setColor} />
    </StorybookTheme>
  )
}

export const Secondary = () => {
  const [color, setColor] = React.useState(colors.blue[200])

  return (
    <StorybookTheme>
      <ColorPicker value={color} onChange={setColor} colors={colorsLight} />
    </StorybookTheme>
  )
}
