import * as React from 'react'
import PropTypes from 'prop-types'

import ThemeProvider from '../../src/ThemeProvider'
import { themeColors, lightTheme, darkTheme } from '../theme'
import { useDarkMode } from 'storybook-dark-mode'


export const StorybookTheme = ({ children }) => {

  const mode = useDarkMode() ? 'dark' : 'light'

  return (
    <ThemeProvider
      theme={{
        ...themeColors,
        mode,
      }}
    >
      {children}
    </ThemeProvider>
  )
}

StorybookTheme.propTypes = {

}
