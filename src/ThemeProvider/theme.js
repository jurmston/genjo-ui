import { createTheme as createMuiTheme } from '@mui/material/styles'
import { colors } from './colors'
import { fontFamily, typographyVariants } from './typography'
import { shadows, popperShadow } from './shadows'
import { createHighlightSx } from './highlights'


import {
  createInputOverrides,
  createButtonOverrides,
  createListOverrides,
} from './component-overrides'


export const borderRadius = 4

export const dividerColor = 'rgba(255, 255, 255, 0.12)'
export const baseUnit = 8


export const fontFamilyMono = 'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;'


export const createTheme = ({ mode, primary, secondary, grey = colors.slate }) => {
  const palette = {
    primary,
    secondary,
    mode,
    grey,
    error: colors.red,
    info: colors.sky,
    success: colors.green,
    warning: colors.amber,
  }

  const typography = {
    fontFamily,
    ...typographyVariants,
  }

  const shape = { borderRadius }
  const spacing = baseUnit

  return createMuiTheme({
    palette,
    typography,
    shape,
    spacing,
    shadows,

    // -- Default Props for Mui Components
    components: {
      // AUTOCOMPLETE
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              padding: 0,
            }
          },

          tag: {
            margin: 2,
            maxWidth: 'calc(100% - 4px)',
          },
          input: {
            padding: 6,
          },
          inputRoot: {
            '&[class*="MuiOutlinedInput-root"]': {
              padding: 0,
              paddingTop: 0,
              paddingLeft: 0,
              '& $input': {
                padding: 6,
              },
            },
          },
          endAdornment: {
            top: 'calc(50% - 11px)',
            right: 8,
          },
        },
      },

      // --- CARD
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: shadows[3],
          },
        },
      },

      // --- CHIP
      MuiChip: {
        defaultProps: {
          size: 'small',
        },

        styleOverrides: {
          root: {
            borderRadius: 4,
          },
          sizeSmall: {
            height: 20,
            fontSize: 11,
            lineHeight: 1.5,
          },
          clickable: {
            fontWeight: 700,
            ...createHighlightSx(palette.primary.main, 4),
          }
        },
      },

      // --- DIALOG
      MuiDialog: {
        defaultProps: {
          fullWidth: true,
        },

        styleOverrides: {
          container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
          },
        },
      },

      // --- FORM CONTROL
      MuiFormControl: {
        styleOverrides: {
          marginNormal: {
            marginTop: 0,
          },
        },
      },

      // --- FORM CONTROL LABEL
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
          label: {
            marginLeft: 0,
          },
        },
      },

      // --- FORM LABEL
      MuiFormLabel: {
        styleOverrides: {
          root: {
            ...typographyVariants.subtitle2,
          },
        },
      },

      // --- FORM HELPER TEXT
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 6,
            marginRight: 6,
          },
          contained: {
            marginLeft: 6,
            marginRight: 6,
          },
        },
      },

      // --- ICON
      MuiIcon: {
        defaultProps: {
          fontSize: 'small',
        },

        styleOverrides: {
          fontSizeSmall: {
            fontSize: '20px',
          },
        },
      },

      // Styled Inputs: Input, FilledInput, OutlinedInput
      ...createInputOverrides({ mode, palette }),
      ...createListOverrides({ palette }),
      ...createButtonOverrides({ palette, typography, shadows }),

      // --- INPUT ADORNMENT
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            // Adjust the default size of the icon button to better fit inside
            // the input.
            '& .MuiIconButton-root': {
              marginTop: 1,
              height: 22,
              width: 22,
            },
          },

          positionStart: {
            marginLeft: 6,
            marginRight: 0,
            marginTop: '0 !important',
          },
          positionEnd: {
            marginRight: 6,
            marginLeft: 0,
            marginTop: '0 !important',
          },
        },
      },

      // --- INPUT LABEL
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },

        styleOverrides: {
          root: {
            marginBottom: 4,
            position: 'relative',

          },
          formControl: {
            transform: 'none',
          },
          shrink: {
            transform: 'none',
          },
          standard: {
            pointerEvents: 'auto',
            transform: 'none',
            '&$shrink': {
              transform: 'none',
            },
          },
          outlined: {
            pointerEvents: 'auto',
            transform: 'none',
            '&$shrink': {
              transform: 'none',
            },
          },
          filled: {
            pointerEvents: 'auto',
            transform: 'none',
            '&$shrink': {
              transform: 'none',
            },
          },
          '& .MuiInputBase-root': {
            marginTop: 0,
          }
        },
      },

      // LINK
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            marginTop: 8,
            boxShadow: popperShadow,
          },
        },
      },


      // PRIVATE NOTCHED OUTLINED
      PrivateNotchedOutline: {
        styleOverrides: {
          root: {
            display: 'none',
          },
        },
      },

      // SELECT
      MuiSelect: {
        styleOverrides: {
          icon: {
            top: 'calc(50% - 9px)',
          },
          selectMenu: {
            height: 'none',
          },
        },
      },

      // SVG ICON
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: 18,
          },
        },
      },

      // TAB
      MuiTab: {
        styleOverrides: {
          wrapper: {
            '&> *:first-of-type': {
              marginBottom: 0,
            },
          },
        },
      },

      // TABLE CELL
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: 4,
            height: 42,
            borderBottom: `1px solid ${colors.grey[300]}`,
          },
          head: {
            color: 'rgba(0, 0, 0, 0.6)',
            height: 56,
            fontWeight: 700,
          },

          footer: {
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: 14,
            // fontWeight: 700,
            height: 56,
            borderBottom: 'none'
          },
        },
      },

      // TABLE PAGINATION
      MuiTablePagination: {
        styleOverrides: {
          toolbar: {
            minHeight: 24,
          },
        },
      },

      // TABLE ROW
      MuiTableRow: {
        styleOverrides: {
          root: {
            // '&.MuiTableRow-head td': {
            //   borderBottom: `2px solid ${colors.stone[200]}`,
            // },
            '&:last-child td:not(.MuiTableCell-footer)': {
              borderBottom: `2px solid ${colors.stone[200]}`,
            },

            '&.Mui-selected': {
              backgroundColor: secondary[50],
            },
          },

          head: {
            '& th': {
              borderBottom: `2px solid ${colors.stone[200]}`,
            },
          },
        },
      },

      // TEXT FIELD
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: 'outlined',
        },
      },

    },
  })
}

export const defaultTheme = {
  mode: 'light',
  primary: colors.blue,
  secondary: colors.amber,
}
