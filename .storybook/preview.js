import React from 'react'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'
import { useDarkMode } from 'storybook-dark-mode'
import AdapterLuxon from '@material-ui/lab/AdapterLuxon'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'
import ThemeProvider from '../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from './theme'

// This fixes an issue related to a warning when using "first-child"
// selector. More about this here:
// https://github.com/mui-org/material-ui/issues/24894
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const cache = createCache({
  key: 'css',
  prepend: true,
})

cache.compat = true


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
      <CacheProvider value={cache}>

          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ThemeProvider theme={muiThemeOptions}>
              {story()}
            </ThemeProvider>
          </LocalizationProvider>

      </CacheProvider>
    )
  },
]

