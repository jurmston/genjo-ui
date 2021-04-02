import { makeStyles, alpha } from '@material-ui/core/styles'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import { colors } from '../colors'


export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },

  headerGridContainer: {
    width: '100%',
    position: 'relative',
    borderBottom: `2px solid ${colors.blueGrey[300]}`,
  },

  dataGrid: {
    width: '100%',
    overflowY: 'hidden',
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

  scrollbarCap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: scrollbarSize(),
    borderBottom: `2px solid ${colors.blueGrey[300]}`,
  },

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
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    '& > div': {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    padding: 4,
    textAlign: 'left',
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

    // '&$hoveredColumnCell': {
    //   backgroundColor: theme.palette.grey[100],

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
      backgroundColor: theme.palette.primary[50],
      fontWeight: 700,
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
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
    },

    '&$isSortable': {
      cursor: 'pointer',
    },

    '&$isSelected': {
      backgroundColor: theme.palette.primary[50],
    }
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

  sortIcon: {
    color: theme.palette.grey[500],

    '&$isSelected': {
      color: theme.palette.primary.main,
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
    borderTop: `2px solid ${colors.blueGrey[300]}`,
    backgroundColor: colors.blueGrey[50],
    borderBottomRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
}))
