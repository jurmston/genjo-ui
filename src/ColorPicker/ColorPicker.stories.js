import React from 'react'

import { ColorPicker } from './ColorPicker'
import { colors, colorsLight } from '../styles/colors'

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
}

export const Primary = () => {
  const [color, setColor] = React.useState(colors.blue[500])

  return <ColorPicker value={color} onChange={setColor} />
}

export const Secondary = () => {
  const [color, setColor] = React.useState(colors.blue[200])

  return <ColorPicker value={color} onChange={setColor} colors={colorsLight} />
}
