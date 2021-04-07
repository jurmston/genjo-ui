import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, defaultTheme } from '../theme'

// Material-UI needs to specify inject order to allow customization
// See: https://next.material-ui.com/guides/migration-v4/#styled-engine
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'

// This needs to be used to prevent a bug with @emotion using the :first-child
// psuedo selectors
// See: https://github.com/mui-org/material-ui/issues/24894
// And upstream: https://github.com/emotion-js/emotion/issues/1178
const cache = createCache({
  key: 'css',
  prepend: true,
})

cache.compat = true


export const ThemeContext = React.createContext()
export const useThemeContext = () => React.useContext(ThemeContext)


/**
 * Provides the app with a change-able MUI theme.
 */
export const ThemeProvider = ({ theme: themeFromProps = null, children }) => {
  const [theme, setTheme] = React.useState(themeFromProps ?? defaultTheme)

  React.useEffect(
    () => {
      setTheme(themeFromProps ?? defaultTheme)
    },
    [themeFromProps]
  )

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider
        theme={createTheme(theme)}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ThemeContext.Provider
          value={{ theme, setTheme }}
        >
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

ThemeProvider.propTypes = {
  /** Wrapped content of the provider */
  children: PropTypes.node,
}
