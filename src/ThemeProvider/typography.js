export const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const letterSpacings  = {
  tightest: '-0.025em',
  tight: '-0.015em',
  normal: '0em',
  wide: '0.015em',
  wider: '0.025em',
  widest: '0.05em',
}

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
}

export const typographyVariants = {
  h1: {
    fontWeight: fontWeights.extraBold,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '2.5rem',
  },
  h2: {
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '2rem',
  },
  h3: {
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '1.5rem',
  },
  h4: {
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '1.25rem',
  },
  h5: {
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '1rem',
  },
  h6: {
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '0.88rem',
  },
  subtitle1: {
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '1rem',
  },
  body1: {
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacings.normal,
    lineHeight: lineHeights.normal,
    fontSize: '1rem',
  },
  subtitle2: {
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.tight,
    fontSize: '0.88rem',
  },
  body2: {
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacings.normal,
    lineHeight: lineHeights.normal,
    fontSize: '0.88rem',
  },
  caption: {
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacings.wide,
    lineHeight: lineHeights.normal,
    fontSize: '0.75rem',
  },
  button: {
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.normal,
    fontSize: '1rem',
    textTransform: 'none',
  },
  overline: {
    fontWeight: fontWeights.light,
    letterSpacing: letterSpacings.tight,
    lineHeight: lineHeights.normal,
    fontSize: '0.88rem',
    textTransform: 'uppercase',
  },
}