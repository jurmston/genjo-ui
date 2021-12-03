import React from 'react'
import { addDecorator } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import AdapterLuxon from '@mui/lab/AdapterLuxon'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import ThemeProvider from '../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from './theme'
import { createTheme as createMuiTheme } from '@mui/material/styles'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'


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


export const parameters = {
  darkMode: {
    // current: 'light',
    dark: darkTheme,
    light: lightTheme,
  }
}


export const decorators = [
  // MUI Theme Provider
  (Story, context) => {
    const mode = useDarkMode() ? 'dark' : 'light'
    const muiThemeOptions = {
      ...themeColors,
      mode,
    }

    // Stupid toggle to remove MUI theme.
    // return <Story {...context} />

    return (
      <CacheProvider value={cache}>


          <ThemeProvider
            mode={mode}
            primary={themeColors.primary}
            secondary={themeColors.secondary}
          >
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <Story {...context} />
            </LocalizationProvider>
          </ThemeProvider>


      </CacheProvider>
    )
  },
]

