import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  editor: {
    overflow: 'hidden',
    position: 'relative',
    border: props => (!props.readOnly ? `1px solid ${theme.palette.divider}` : 'none'),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    outline: 'none',
  },

  isFocused: {},
  buttons: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0)',
    padding: 4,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['background-color', 'border-top-color']),

    '&$isFocused': {
      backgroundColor: theme.palette.grey[100],
      borderTopColor: theme.palette.divider,

      '& $actionButton': {
        opacity: 1,
      },
    },
  },

  actionButton: {
    opacity: 0.5,
    marginRight: 4,
    transition: theme.transitions.create('opacity'),
  },

  actionButtonIcon: {},

  content: {
    padding: 8,
    outline: 'none',
    ...theme.typography.body2,
    '& p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
  },

  button: {
    margin: 2,
  },

  element: {
    // ...theme.typography.body2,
    fontSize: theme.typography.body2.fontSize,
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },

  heading: {
    marginBlockStart: `${theme.spacing(0.5)}px`,
    marginBlockEnd: `${theme.spacing(0.5)}px`,
    '& span': {
      fontSize: theme.typography.h6.fontSize,
    },
  },

  quote: {
    position: 'relative',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderLeft: `2px solid ${theme.palette.divider}`,
    '& span': {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: '"Vollkorn", serif',
    },
  },

  leaf: {
    fontSize: theme.typography.body2.fontSize,
    '& strong': {
      fontWeight: 500,
    },
  },
}))


export const useMessageStyles = makeStyles(theme => ({
  message: {
    padding: 8,
    outline: 'none',
    overflow: 'auto',
    position: 'relative',
    minHeight: props => props.minHeight ?? 'unset',
    maxHeight: props => props.maxHeight ?? 'unset',
    ...theme.typography.body2,

    '& p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },

    '& blockquote': {
      position: 'relative',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: theme.spacing(2),
      color: theme.palette.text.secondary,
      borderLeft: `2px solid ${theme.palette.divider}`,
      '& span': {
        fontSize: theme.typography.body2.fontSize,
        fontFamily: '"Vollkorn", serif',
      },
    },

    '& strong': {
      fontWeight: 700,
    },

    '& h1': {

    },
  },
}))