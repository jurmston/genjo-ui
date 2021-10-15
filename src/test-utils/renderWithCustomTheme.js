import * as React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'


export function renderWithCustomTheme(children) {
  return render(
    <ThemeProvider theme={createTheme()}>
      {children}
    </ThemeProvider>
  )
}
