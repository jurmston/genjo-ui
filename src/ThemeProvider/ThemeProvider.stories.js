import React from 'react'

import { ThemeProvider } from './ThemeProvider'
import { colors, colorsLight } from '../ThemeProvider/colors'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
}

export const Primary = () => {
  const [color, setColor] = React.useState(colors.blue[500])

  return (
    <StorybookTheme>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Default Theme</Typography>

          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained">Primary</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">Secondary</Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">Custom Nested Theme</Typography>

          <ThemeProvider
            mode="light"
            primary={colors.purple}
            secondary={colors.green}
          >
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained">Primary</Button>
              </Grid>

              <Grid item>
                <Button variant="contained" color="secondary">Secondary</Button>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Grid>

      </Grid>

      <ThemeProvider value={color} onChange={setColor} />
    </StorybookTheme>
  )
}

export const Secondary = () => {
  const [color, setColor] = React.useState(colors.blue[200])

  return (
    <StorybookTheme>
      <ThemeProvider value={color} onChange={setColor} colors={colorsLight} />
    </StorybookTheme>
  )
}
