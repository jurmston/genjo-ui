import { makeStyles, alpha } from '@material-ui/core/styles'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import { colors } from '../colors'


export const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },

  headerGridContainer: {
    width: '100%',
    position: 'relative',
  },

  innerBorder: {
    width: '100%',
    height: 2,
    backgroundColor: colors.blueGrey[300],
  },

  dataGridContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirectin: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Removes scrollbars from grid containers. */
  noScrollbars: {
    scrollbarWidth: 'thin',
    scrollbarColor: 'transparent transparent',

    '&::-webkit-scrollbar': {
      width: 1,
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },

    '&$noScrollbars::-webkit-scrollbar': {
      display: 'none',  /* Safari and Chrome */
    },

  },

  // scrollbarCap: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   width: scrollbarSize(),
  //   borderBottom: `2px solid ${colors.blueGrey[300]}`,
  // },

  /** Draggable line that appears when resizing columns. */
  dragBoundry: {
    position: 'absolute',
    borderTopLeftRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary[100], 0.25),
    borderRight: `2px solid ${theme.palette.secondary.main}`,
    top: 0,
    bottom: 0,
  },

  // --- CELLS
  roundTop: {},
  roundBottom: {},
  hoveredColumnCell: {},
  hoveredRowCell: {},
  isSelected: {},
  isSubtotalTitle: {},
  isSubtotalTotal: {},
  cell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    boxSizing: 'border-box',
    // overflow: 'hidden',
    overflow: 'hidden',
    '& > span': {
      // position: 'relative',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    padding: 4,
    ...theme.typography.body2,

    '&$roundTop': {
      borderTopLeftRadius: theme.shape.borderRadius,
    },

    '&$roundBottom': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    '&$hoveredRowCell': {
      backgroundColor: colors.blueGrey[50],
    },

    '&$hoveredColumnCell': {
      backgroundColor: colors.blueGrey[50],
    },

    //   '&$hoveredRowCell': {
    //     backgroundColor: colors.blueGrey[100],
    //     zIndex: 9999,
    //     overflow: 'visible',
    //     '& > div': {
    //       backgroundColor: colors.blueGrey[100],
    //       width: 'unset',
    //     }
    //   },
    // },

    '&$isSelected': {
      backgroundColor: theme.palette.secondary[50],
    },

    '&$isSubtotalTitle': {
      borderTop: `3px solid ${theme.palette.primary[100]}`,
    },

    '&$isSubtotalTotal': {
      backgroundColor: theme.palette.primary[50],
      fontWeight: 700,
    },
  },

  // --- HEADER
  isSortable: {},
  isHovered: {},
  headerCell: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('background-color'),
    fontWeight: 700,
    color: colors.blueGrey[500],

    '&:hover': {
      '& $sortIcon': {
        opacity: 1,
      },
    },

    '&$isSortable': {
      cursor: 'pointer',
    },

    '&$isSelected': {
      backgroundColor: theme.palette.primary[50],
    },

    '&$hoveredColumnCell': {
      backgroundColor: theme.palette.primary[50],
      color: theme.palette.primary[500],
    },
  },

  hasContent: {},
  totalCell: {
    '&$hoveredColumnCell': {
      '&$hasContent': {
        backgroundColor: colors.blueGrey[100],
      },
    },
  },

  resizeHeaderButton: {
    transition: theme.transitions.create('opacity'),
    position: 'absolute',
    opacity: 0,
    width: 4,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: colors.blueGrey[700],
    cursor: 'col-resize',

    '&:hover': {
      opacity: 1,
    },

    '&$isHovered': {
      opacity: 1,
    },

  },

  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',

    '& > span': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },

  sortIcon: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },

  loadingBar: {
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  // --- TOTAL ROW
  totalLabel: {
    color: colors.blueGrey[700],
    fontWeight: 700,
    fontSize: theme.typography.caption.fontSize,
  },

  totalGridContainer: {
    backgroundColor: colors.blueGrey[50],
    borderBottomRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },

  subtotalTitle: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  subtotalTitleText: {
    padding: 8,
    backgroundColor: theme.palette.primary[100],
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    ...theme.typography.h6,
  },

  countText: {
    marginLeft: 16,
    ...theme.typography.subtitle2,
    color: theme.palette.grey[700],
  },

  isFirst: {},
  isLast: {},
  subtotalCell: {
    borderTop: `2px solid ${theme.palette.primary[100]}`,
    backgroundColor: colors.blueGrey[100],

    '&$isFirst': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    '&iLast': {
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  },
}))
