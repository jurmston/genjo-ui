import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from './theme'

import { colors } from './colors'

import ThemeContext from './ThemeContext'


/**
 * Provides the app with a change-able MUI theme.
 */
export const ThemeProvider = ({
  primary: primaryFromProps = colors.indigo,
  secondary: secondaryFromProps = colors.orange,
  mode: modeFromProps = 'light',
  children,
}) => {
  const [theme, setTheme] = React.useState({
    primary: primaryFromProps,
    secondary: secondaryFromProps,
    mode: modeFromProps,
  })

  const muiTheme = createTheme(theme)

  React.useEffect(() => {
    setTheme({
      primary: primaryFromProps,
      secondary: secondaryFromProps,
      mode: modeFromProps,
    })
  }, [primaryFromProps, secondaryFromProps, modeFromProps])

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeContext.Provider
        value={{ muiTheme, theme, setTheme }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  /** Wrapped content of the provider */
  children: PropTypes.node,
  /** Theme object with default mode and colors */
  primary: PropTypes.object,
  secondary: PropTypes.object,
  mode: PropTypes.oneOf(['light', 'dark'])
}

export default ThemeProvider
