import { createHighlightSx, createHighlight, highlightTransition, baseHighlight } from '../highlights'


export function createButtonOverrides({ typography, palette, shadows }) {
  const MuiButton = {
    defaultProps: {
      disableElevation: true,
      disableFocusRipple: true,
    },

    styleOverrides: {
      root: {
        ...typography.button,
        // Creates padding that matches the size of inputs.
        padding: `4px 8px`,
        transition: highlightTransition,
        borderRadius: 4,  // Creates pill shape
        '& .MuiButton-startIcon': {
          marginRight: 4,
          marginLeft: -2,
        },
        '& .MuiButton-endIcon': {
          marginRight: -2,
          marginLeft: 4,
        },
        ...createHighlightSx(palette.primary.main, 4),
      },
      outlined: {
        boxShadow: shadows[1],

        '&:hover': {
          boxShadow: shadows[2],
        },
      },
      contained: {
        // border: `1px solid ${colors.grey[300]}`,
        boxShadow: shadows[1],
        border: 0,
        '&:hover:': {
          boxShadow: shadows[2],
        },
      },
      text: {
      },
      iconSizeMedium: {
        fontSize: 14,
        '&> *:first-of-type': {
          fontSize: 14,
        },
      },
    },
  }

  const MuiIconButton = {
    defaultProps: {
      disableFocusRipple: true,
      size: 'small',
    },

    styleOverrides: {
      root: {
        borderRadius: 4,
        transition: highlightTransition,
        ...createHighlightSx(palette.primary.main, 4),
      }
    },

    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          border: `1px solid currentColor`,
          boxShadow: shadows[1],

          '&:hover': {
            boxShadow: shadows[2],
          },
        },
      },
      {
        props: { variant: 'contained' },
        style: {
          boxShadow: shadows[1],
          color: '#fff',

          backgroundColor: palette.grey.main,

          '&:hover': {
            boxShadow: shadows[2],
            backgroundColor: palette.grey.dark,
          },

          '&.MuiIconButton-colorPrimary': {
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },

          '&.MuiIconButton-colorSecondary': {
            backgroundColor: palette.secondary.main,
            '&:hover': {
              backgroundColor: palette.secondary.dark,
            },
          },
        },
      },
    ]
  }

  return {
    MuiButton,
    MuiIconButton,
  }
}
