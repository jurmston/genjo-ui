import { makeStyles, alpha } from '@material-ui/core/styles'
import { colors } from '../ThemeProvider'

export const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    position: 'relative',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
  },

  headerGridContainer: {
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'hidden',
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
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h6.fontSize,
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
      display: 'none' /* Safari and Chrome */,
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
  isSubtotalTotal: {},
  isClickable: {},
  cell: {
    outline: 'none',
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

    '&$isClickable': {
      cursor: 'pointer',
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

    '&$isSubtotalTotal': {
      backgroundColor: theme.palette.primary[50],
      fontWeight: 700,
    },
  },

  // --- HEADER
  isSortable: {},
  isHovered: {},
  isSubtotal: {},
  headerCell: {
    // borderTopLeftRadius: theme.shape.borderRadius,
    // borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('background-color'),
    fontWeight: 700,
    color: colors.blueGrey[500],

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

    '&$isSubtotal': {
      backgroundColor: theme.palette.secondary[50],
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
    // borderTopRightRadius: theme.shape.borderRadius,
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
    overflow: 'hidden',
  },

  subtotalTitle: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  subtotalTitleText: {
    paddingLeft: 8,
    // borderTopLeftRadius: theme.shape.borderRadius,
    ...theme.typography.h6,
  },

  countText: {
    marginLeft: 16,
    ...theme.typography.subtitle2,
    color: theme.palette.grey[700],
  },

  subtotalCell: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: colors.blueGrey[50],
  },

  actionButton: {
    color: theme.palette.grey[500],
  },

  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }
}))

export default useStyles
