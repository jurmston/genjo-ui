import React from 'react'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'
import { useDarkMode } from 'storybook-dark-mode'
import AdapterLuxon from '@material-ui/lab/AdapterLuxon'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'
import ThemeProvider from '../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from './theme'


addDecorator(withPerformance)


export const parameters = {
  darkMode: {
    // current: 'light',
    dark: darkTheme,
    light: lightTheme,
  }
}


export const decorators = [
  // MUI Theme Provider
  story => {
    const mode = useDarkMode() ? 'dark' : 'light'
    const muiThemeOptions = {
      ...themeColors,
      mode,
    }

    return (
      <StyledEngineProvider injectFirst>

        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ThemeProvider theme={muiThemeOptions}>
            {story()}
          </ThemeProvider>
        </LocalizationProvider>

      </StyledEngineProvider>
    )
  },
]

