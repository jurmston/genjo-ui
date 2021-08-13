import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'


const DRAWER_CLOSED_WIDTH = 21
const DRAWER_OPEN_WIDTH = 256


const useStyles = makeStyles(theme => ({
  menu: {
    position: 'fixed',
    paddingTop: 16,
    top: 48,
    bottom: 0,
    left: 0,
    width: props => !props.hasContent ? 0 : props.isOpen || props.isHovering ? DRAWER_OPEN_WIDTH : DRAWER_CLOSED_WIDTH,
    backgroundColor: theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[800],
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowX: 'visible',
    overflowY: 'auto',
    zIndex: theme.zIndex.drawer,
    transition: `width 0.15s ease`,
  },

  content: {
    pointerEvents: props => props.isOpen || props.isHovering ? 'unset' : 'none',
    opacity: props => props.isOpen || props.isHovering ? 1 : 0,
    transition: 'opacity 0.15s ease',
  },

  button: {
    zIndex: theme.zIndex.drawer + 2,
    opacity: props => !props.hasContent
      ? 0
      : !props.isOpen && props.isHovering
      ? 0
      : !props.isOpen || props.isOpen && props.isHovering
      ? 1
      : 0,
    position: 'fixed',
    boxSizing: 'border-box',
    top: 48 + 18,
    left: props => props.isOpen || props.isHovering ? DRAWER_OPEN_WIDTH - 15 : DRAWER_CLOSED_WIDTH - 15,
    transition: 'left 0.15s ease, opacity 0.15s ease',
    // left: 21 + 56 - 14,
    height: 28,
    width: 28,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.mode === 'light'
      ? theme.palette.common.white
      : theme.palette.grey[900],
    borderRadius: '50%',
    // '&$isOpen': {
    //   // left: 256 + 56 - 14,
    //   opacity: 0,
    // },
    // '&$isHovering': {
    //   opacity: 1,
    // },
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      opacity: 1,
    },
    // When the menu is in `!isOpen && isHovering` disable the menu button.
    // This prevents the user trying to get the button while also trying to
    // hover.
    pointerEvents: props => !props.hasContent || (!props.isOpen && props.isHovering) ? 'none' : 'unset',

    // Horizontally and vertically align the icon.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

/**
 * Menu panel.
 */
const MenuPanel = ({ isOpen, toggle, children, hasContent = false, ...listProps }) => {
  const [isHovering, setIsHovering] = React.useState(false)
  const classes = useStyles({ isOpen, isHovering, hasContent })

  return (
    <>
      <div
        className={classes.menu}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={classes.content}>
          {isOpen || isHovering ? children : null}
        </div>
      </div>

      <div
        className={classes.button}
      >
        <IconButton className={classes.iconButton} onClick={toggle}>
          {isOpen ? (
            <KeyboardArrowLeftIcon />
            ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      </div>
    </>
  )
}

MenuPanel.propTypes = {
  /** Content of the menu list. */
  children: PropTypes.node,
}

export { MenuPanel }
