import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import AdapterLuxon from '@material-ui/lab/AdapterLuxon'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import { ThemeProvider } from '../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from './theme'


export const parameters = {
  darkMode: {
    // current: 'light',
    dark: darkTheme,
    light: lightTheme,
  }
}


export const decorators = [
  (story) => {
    const mode = useDarkMode() ? 'dark' : 'light'
    const muiThemeOptions = {
      ...themeColors,
      mode,
    }

    return (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={muiThemeOptions}>
          {story()}
        </ThemeProvider>
      </LocalizationProvider>
    )
  },
]

