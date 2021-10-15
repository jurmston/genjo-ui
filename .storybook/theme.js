import { createTheme as createMuiTheme } from '@mui/material/styles'
import { create } from '@storybook/theming/create'
import { colors } from '../src/ThemeProvider'


const createThemeFromMUITheme = (name, theme) => {
  return create({
    base: name,

    colorPrimary: theme.palette.primary.main,
    colorSecondary: theme.palette.secondary.main,

    // UI
    appBg: theme.palette.background.default,
    appContentBg: theme.palette.background.paper,
    appBorderColor: theme.palette.background.paper,
    appBorderRadius: theme.shape.borderRadius,

    // Typography
    fontBase: theme.typography.fontFamily,
    fontCode: 'monospace',

    // Text colors
    textColor: theme.palette.text.primary,
    textInverseColor: theme.palette.text.secondary,

    // Toolbar default and active colors
    barTextColor: theme.palette.text.primary,
    barSelectedColor: theme.palette.text.secondary,
    barBg: theme.palette.background.default,

    brandTitle: 'Genjo-UI',
    brandUrl: 'https://github.com/jurmston/genjo-ui',
    // brandImage: 'https://placehold.it/350x150',
  })
}

export const themeColors = {
  primary: colors.red,
  secondary: colors.teal,
}

export const lightTheme = createThemeFromMUITheme('light', createMuiTheme({
  palette: {
    ...themeColors,
    mode: 'light',
  },
}))

export const darkTheme = createThemeFromMUITheme('dark', createMuiTheme({
  palette: {
    ...themeColors,
    mode: 'dark',
  },
}))
