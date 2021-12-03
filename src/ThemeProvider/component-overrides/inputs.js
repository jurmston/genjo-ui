import { highlightTransition, createHighlight } from '../highlights'


export function createInputOverrides({ palette, mode }) {
  const MuiInputBase = {
    styleOverrides: {
      root: {
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
  }

  const styledBase = {
    defaultProps: {
      disableUnderline: true,
    },

    styleOverrides: {
      root: {
        boxSizing: 'border-box',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        transition: highlightTransition,
        borderColor: 'transparent',
        backgroundColor: mode === 'light' ? '#fff' : '#000',
        '&:hover': {
          backgroundColor: mode === 'light' ? palette.grey[50] : 'rgba(0, 0, 0, 0.8)',
        },
        '&.Mui-focused': {
          borderColor: palette.primary.main,
          backgroundColor: mode === 'light' ? '#fff' : '#000',
          boxShadow: createHighlight(palette.primary.main),
          '&.Mui-error': {
            boxShadow: createHighlight(palette.error.main)
          },
        },
        '&.Mui-error': {
          borderColor: palette.error.main,
        },
      },
      adornedStart: {
        paddingLeft: 0,
      },
      adornedEnd: {
        paddingRight: 0,
      },
      input: {
        padding: `4px 6px`,
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
        borderRadius: 4,
        padding: 0,
      },
    },
  }

  const MuiInput = {
    ...styledBase,
    styleOverrides: {
      ...styledBase.styleOverrides,
      root: {
        ...styledBase.styleOverrides.root,
        'label + &': {
          marginTop: 0,
        },
      }
    }
  }

  const MuiFilledInput = {
    ...styledBase,

    styleOverrides: {
      ...styledBase.styleOverrides,
      root: {
        ...styledBase.styleOverrides.root,
        backgroundColor: mode === 'light' ? palette.grey[100] : palette.grey[900],
        borderColor: mode === 'light' ? palette.grey[300] : palette.grey[500],
      },
    },
  }

  const MuiOutlinedInput = {
    ...styledBase,
    styleOverrides: {
      ...styledBase.styleOverrides,
      root: {
        ...styledBase.styleOverrides.root,
        borderColor: mode === 'light' ? palette.grey[300] : palette.grey[500],
        // Hide the nothced outlined. It is designed to accomodate floating
        // labels which genjo-ui does not use.
        '& .MuiOutlinedInput-notchedOutline': {
          display: 'none',
        }
      },
    },
  }

  return {
    MuiInputBase,
    MuiInput,
    MuiFilledInput,
    MuiOutlinedInput,
  }
}