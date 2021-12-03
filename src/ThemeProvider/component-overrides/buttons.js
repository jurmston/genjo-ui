import { createHighlight, highlightTransition } from '../highlights'


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
        '&:focus': {
          boxShadow: createHighlight(palette.primary.main),
        },
        '& .MuiButton-startIcon': {
          marginRight: 4,
          marginLeft: -2,
        },
        '& .MuiButton-endIcon': {
          marginRight: -2,
          marginLeft: 4,
        },
      },
      outlined: {
        boxShadow: shadows[1],

        '&:hover:not(:focus)': {
          boxShadow: shadows[2],
        },
      },
      contained: {
        // border: `1px solid ${colors.grey[300]}`,
        boxShadow: shadows[1],
        border: 0,
        '&:hover:not(:focus)': {
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
        '&:focus': {
          boxShadow: createHighlight(palette.primary[500]),
        },
      }
    },
  }

  return {
    MuiButton,
    MuiIconButton,
  }
}
