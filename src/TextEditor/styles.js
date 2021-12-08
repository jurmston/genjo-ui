export function getTextSx(props) {
  return {
    px: props?.variant === 'contained' ? 2 : 0,
    py: props?.variant === 'contained' ? 1 : 0,
    outline: 'none',
    overflow: 'auto',
    position: 'relative',
    minHeight: props?.minHeight ?? 'unset',
    maxHeight: props?.maxHeight ?? 'unset',
    typography: 'body1',

    '& p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },

    '& blockquote': {
      position: 'relative',
      ml: 0,
      mr: 0,
      pl: 2,
      py: 1,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      marginInlineStart: 0,
      marginInlinEend: 0,
      color: 'text.secondary',
      borderLeft: 2,
      borderLeftColor: 'divider',
      '& span': {
        typography: 'h4',
        fontWeight: 'light',
      },
      '& strong > span': {
        fontWeight: 'medium',
      },
    },

    '& strong': {
      fontWeight: 'bold',
    },
  }
}
