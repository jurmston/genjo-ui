import React from 'react'

import { ThemeProvider } from './ThemeProvider'
import { colors, colorsLight } from '../ThemeProvider/colors'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


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
