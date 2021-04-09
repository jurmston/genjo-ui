import * as React from 'react'
import ThemeContext from './ThemeContext'

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(`useTheme must be within a ThemeProvider`)
  }
  return context
}

export default useTheme
