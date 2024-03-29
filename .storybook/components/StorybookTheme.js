import * as React from 'react'
import PropTypes from 'prop-types'

import ThemeProvider from '../../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from '../theme'
import { useDarkMode } from 'storybook-dark-mode'


export const StorybookTheme = ({ children }) => {

  const mode = useDarkMode() ? 'dark' : 'light'

  return (
    <ThemeProvider
      mode={mode}
      {...themeColors}
    >
      {children}
    </ThemeProvider>
  )
}

StorybookTheme.propTypes = {
  children: PropTypes.node,
}
