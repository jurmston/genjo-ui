import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, defaultTheme } from '../styles/theme'

import ThemeContext from './ThemeContext'


/**
 * Provides the app with a change-able MUI theme.
 */
export const ThemeProvider = ({ theme: themeFromProps = null, children }) => {
  const [theme, setTheme] = React.useState(themeFromProps ?? defaultTheme)

  const muiTheme = createTheme(theme)

  React.useEffect(() => {
    setTheme(themeFromProps ?? defaultTheme)
  }, [themeFromProps])

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeContext.Provider value={{ muiTheme, theme, setTheme }}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  /** Wrapped content of the provider */
  children: PropTypes.node,
  /** Theme object with default mode and colors */
  theme: PropTypes.object,
}

export default ThemeProvider
