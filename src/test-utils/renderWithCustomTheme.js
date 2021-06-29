import * as React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'


export function renderWithCustomTheme(children) {
  return render(
    <ThemeProvider theme={createTheme()}>
      {children}
    </ThemeProvider>
  )
}
