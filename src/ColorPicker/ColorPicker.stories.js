import React from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import { ColorPicker } from './ColorPicker'
import { colors } from '../ThemeProvider/colors'


export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
}

export const Primary = () => {
  const [color, setColor] = React.useState(colors.blue[500])

  return (
    <FormControlLabel
      sx={{ gap: 1 }}
      control={
        <ColorPicker value={color} onChange={setColor} />
      }
      label="Pick a color"
    />
  )
}
