import { createTheme as createMuiTheme } from '@material-ui/core/styles'
import { colors } from './colors'

function round(value) {
  return Math.round(value * 1e5) / 1e5
}

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

// Default for normal text. Based on `body2`.
export const typographyText = {
  fontFamily,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.43,
  letterSpacing: `${round(0.15 / 14)}em`,
}

export const typographyCaption = {
  fontFamily,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.66,
  letterSpacing: `${round(0.4 / 12)}em`,
}

// Default for labels and small subheaders. Based on `subtitle2`.
export const typographyLabel = {
  fontFamily,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.57,
  letterSpacing: `${round(0.1 / 14)}em`,
}

// Default for headers. Based on `h4`.
export const typographyHeading1 = {
  fontFamily,
  fontSize: 34,
  fontWeight: 700,
  lineHeight: 1.235,
  letterSpacing: `${round(0.15 / 34)}em`,
}

// Default for headers. Based on `h6`.
export const typographyHeading2 = {
  fontFamily,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.334,
  letterSpacing: `${round(0 / 20)}em`,
}

export const typographyHeading3 = {
  fontFamily,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.6,
  letterSpacing: `${round(0.15 / 20)}em`,
}

export const typographyHeading4 = {
  fontFamily,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.57,
  letterSpacing: `${round(0.1 / 16)}em`,
}

export const borderRadius = 8

export const dividerColor = 'rgba(255, 255, 255, 0.12)'
export const spacingBaseUnit = 8



const shadowKeyUmbraOpacity = 0.05
const shadowKeyPenumbraOpacity = 0.1
const shadowAmbientShadowOpacity = 0.05

export function createShadow(...px) {
  return [
    `rgb(255, 255, 255) 0px 0px 0px 0px`,
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',')
}

'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'


const shadows = [
  'none',
  createShadow(0, 0, 0, 1, 0, 2, 5, -1, 0, 1, 2, -1), // 1
  createShadow(0, 0, 0, 1, 0, 4, 8, -1, 0, 1, 3, -1), // 2
  createShadow(0, 0, 0, 1, 0, 4, 8, -1, 0, 1, 3, -1),
  createShadow(0, 0, 0, 1, 0, 6, 12, -2, 0, 2, 2, -1), // 4
  createShadow(0, 0, 0, 1, 0, 6, 12, -2, 0, 2, 2, -1),
  createShadow(0, 0, 0, 1, 0, 6, 12, -2, 0, 2, 2, -1),
  createShadow(0, 0, 0, 1, 0, 6, 12, -2, 0, 2, 2, -1),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2), // 8
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 10, 15, -3, 0, 4, 5, -2),
  createShadow(0, 0, 0, 1, 0, 15, 20, -4, 0, 5, 7, -3), // 24
]


export const createTheme = ({ mode, primary, secondary }) =>
  createMuiTheme({
    palette: {
      primary,
      secondary,
      mode,
    },

    typography: {
      fontFamily,
      h1: typographyHeading1,
      h2: typographyHeading2,
      h3: typographyHeading3,
      h4: typographyHeading4,
    },

    shape: {
      borderRadius,
    },

    spacing: spacingBaseUnit,

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

      // --- AVATER
      MuiAvatar: {
        styleOverrides: {
          root: {
            height: 32,
            width: 32,
          },
        },
      },

      // BUTTON
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            ...typographyText,
            textTransform: 'none',
            // Creates padding that matches the size of inputs.
            padding: '7px 16px',
            borderRadius: 999,  // Creates pill shape
          },
          outlined: {
            padding: '6px 16px',
            boxShadow: '0 1px 4px 0 rgb(21 27 38 / 8%)',
            '&:hover': {
              boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
            },
          },
          contained: {
            padding: '6px 16px',
            border: `1px solid ${colors.grey[300]}`,
            boxShadow: '0 1px 4px 0 rgb(21 27 38 / 8%)',
            '&:hover': {
              boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
            },
          },
          text: {
            padding: '7px 16px',
          },
          iconSizeMedium: {
            fontSize: 14,
            '&> *:first-of-type': {
              fontSize: 14,
            },
          },
        },

        variants: [
          {
            props: { variant: 'white' },
            style: {
              boxShadow: '0 1px 4px 0 rgb(21 27 38 / 8%)',
              backgroundColor: colors.common.white,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: colors.grey[300],
              '&:hover': {
                boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
              },
            }
          },
        ],
      },

      // BUTTON BASE
      MuiButtonBase: {
        styleOverrides: {
          root: {
            // Turning off the ripple effects also turns off the keyboard accessiblity.
            // This manually adds it back.
            '&$focusVisible': {
              boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.25), 0px 0px 5px rgba(0, 0, 0, 0.25) inset`,
            },
            '&:active': {
              opacity: 0.75,
            },
          },
        },
      },

      MuiCard: {
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              boxShadow: '0 1px 4px 0 rgb(21 27 38 / 8%)',
              boxSizing: 'border-box',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'transparent',
              '&:hover': {
                boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
                borderColor: mode === 'light' ? colors.grey[300] : colors.grey[500]
              },
            }
          },
        ],
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
          },
        },
      },

      // --- DIALOG
      MuiDialog: {
        defaultProps: {
          fullWidth: true,
        },

        styleOverrides: {
          container: {
            position: 'z`absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
          },
        },
      },

      // --- DIALOG ACTIONS
      MuiDialogActions: {
        styleOverrides: {
          root: {
            // borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
          },
        },
      },

      // --- DIALOG TITLE
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            // backgroundColor: primary?.main ?? primary?.[500],
            // color: '#fff',
          },
        },
      },

      // FAB
      MuiFab: {
        defaultProps: {
          size: 'small',
        },
      },

      // -- FILLED INPUT
      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true,
        },

        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            borderRadius: 999,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: mode === 'light' ? colors.grey[300] : colors.grey[600],
            backgroundColor: mode === 'light' ? colors.grey[100] : colors.grey[900],
            '&:hover': {
              backgroundColor: mode === 'light' ? colors.grey[50] : 'rgba(0, 0, 0, 0.8)',
            },
            '&.Mui-focused': {
              borderColor: primary[500],
              backgroundColor: mode === 'light' ? '#fff' : '#000',
            },
            '&.Mui-error': {
              borderColor: colors.red[500],
            },
          },
          adornedStart: {
            paddingLeft: 0,
          },
          adornedEnd: {
            paddingRight: 0,
          },
          input: {
            padding: `6px 12px`,
            '&:-webkit-autofill': {
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
              borderBottomLeftRadius: 'inherit',
              borderBottomRightRadius: 'inherit',
            },
          },
          inputAdornedStart: {
            paddingLeft: 4,
          },
          inputAdornedEnd: {
            paddingRight: 4,
          },
          multiline: {
            borderRadius: 17,
            padding: 0,
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
            ...typographyLabel,
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

      // --- ICON BUTTON
      MuiIconButton: {
        defaultProps: {
          size: 'small',
        },
      },

      // --- INPUT
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },

        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            borderRadius: 999,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'transparent',
            '&:hover': {
              backgroundColor: mode === 'light' ? colors.grey[200] : colors.grey[800],
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              borderColor: primary[500],
            },
          },
          formControl: {
            'label + &': {
              marginTop: 0,
            },
          },

          input: {
            padding: `6px 12px`,
          },

          multiline: {
            borderRadius: 17,
          }
        },
      },

      // --- INPUT ADORNMENT
      MuiInputAdornment: {
        styleOverrides: {
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

      // --- INPUT BASE
      MuiInputBase: {
        styleOverrides: {
          root: {
            ...typographyText,
            margin: 0,
            '& .MuiSelect-icon': {
              top: 'calc(50% - 9px)',
            },

            // This prevents the input adornment and select field from having
            // different colors.
            '& .MuiSelect-select': {
              backgroundColor: 'transparent !important',
            }
          },
          formControl: {
            margin: 0,
          },
          multiline: {
            padding: 0,
          },
          input: {
            padding: `6px 12px`,
            textOverflow: 'ellipsis',
          },
          inputMultiline: {
            padding: `6px 12px`,
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
            marginLeft: 0,
            position: 'relative',
          },
          formControl: {
            transform: 'none',
          },
          shrink: {
            transform: 'none',
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
        },
      },

      // LIST
      MuiList: {
        defaultProps: {
          dense: true,
        },

        variants: [
          {
            props: { variant: 'contained' },
            style: {
              borderRadius,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: mode === 'light' ? colors.grey[300] : colors.grey[500],
              // backgroundColor: mode === 'light' ? colors.grey[50] : colors.grey[800],
            },
          }
        ],
      },

      // --- LIST ITEM AVATAR
      MuiListItemAvatar: {
        styleOverrides: {
          root: {
            minWidth: 40,
          },
        },
      },

      // LIST ITEM ICON
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 32,
          },
        },
      },

      // LIST ITEM TEXT
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0,
          },
          multiline: {
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
          },

          primary: {
            ...typographyText,
          },

          secondary: {
            ...typographyCaption,
          },

          inset: {
            paddingLeft: 32,
          }
        },
      },

      // --- LIST SUBHEADER
      MuiListSubheader: {
        defaultProps: {
          disableSticky: true,
        },

        styleOverrides: {
          root: {
            color: colors.grey[500],
          },
        },
      },

      // MENU ITEM
      MuiMenuItem: {
        styleOverrides: {
          root: {
            ...typographyText,
          },
        },
      },

      // --- OUTLINED INPUT
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            borderRadius: 999,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: mode === 'light' ? colors.grey[300] : colors.grey[500],
            '&:hover': {
              backgroundColor: mode === 'light' ? colors.grey[200] : colors.grey[800],
            },
            '&.Mui-focused': {
              borderWidth: 1,
              borderColor: primary[500],
            },
            '&$error': {
              borderColor: colors.red[500],
            },
            // Hide the nothced outlined. It is designed to accomodate floating
            // labels which genjo-ui does not use.
            '& .MuiOutlinedInput-notchedOutline': {
              display: 'none',
            }
          },
          adornedStart: {
            paddingLeft: 0,
          },
          adornedEnd: {
            paddingRight: 0,
          },
          input: {
            padding: `6px 12px`,
          },
          inputAdornedStart: {
            paddingLeft: 4,
          },
          inputAdornedEnd: {
            paddingRight: 4,
          },
          multiline: {
            borderRadius: 17,
            padding: 0,
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
            //   borderBottom: `2px solid ${colors.blueGrey[200]}`,
            // },
            '&:last-child td:not(.MuiTableCell-footer)': {
              borderBottom: `2px solid ${colors.blueGrey[200]}`,
            },

            '&.Mui-selected': {
              backgroundColor: secondary[50],
            },
          },

          head: {
            '& th': {
              borderBottom: `2px solid ${colors.blueGrey[200]}`,
            },
          },
        },
      },

      // TEXT FIELD
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: 'filled',
        },
      },

      // TOGGLE BUTTON
      MuiToggleButton: {
        styleOverrides: {

        },
      },

      // TYPOGRAPHY
      MuiTypography: {
        defaultProps: {
          variant: 'body2',
        },
      },
    },
  })

export const defaultTheme = {
  mode: 'light',
  primary: colors.blue,
  secondary: colors.amber,
}
