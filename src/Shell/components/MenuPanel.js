import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'


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
      ? theme.palette.grey[100]
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
    top: 48 + 18,
    left: props => props.isOpen || props.isHovering ? DRAWER_OPEN_WIDTH - 14 : DRAWER_CLOSED_WIDTH - 14,
    transition: 'left 0.15s ease, opacity 0.15s ease',
    // left: 21 + 56 - 14,
    height: 28,
    width: 28,
    border: `2px solid ${theme.palette.divider}`,
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
      border: `2px solid ${theme.palette.primary.main}`,
      opacity: 1,
    },
    // When the menu is in `!isOpen && isHovering` disable the menu button.
    // This prevents the user trying to get the button while also trying to
    // hover.
    pointerEvents: props => !props.hasContent || (!props.isOpen && props.isHovering) ? 'none' : 'unset',


  },
}))

/**
 * Menu panel.
 */
const MenuPanel = ({ isOpen, setIsOpen, children, hasContent = false, ...listProps }) => {
  const [isHovering, setIsHovering] = React.useState(false)
  const classes = useStyles({ isOpen, isHovering, hasContent })

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className={classes.menu}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={classes.content}>
          {children}
        </div>
      </div>

      <div
        className={classes.button}
      >
        <IconButton className={classes.iconButton} onClick={toggle}>
          <KeyboardArrowLeftIcon style={{
            transition: 'transform 0.15s ease',
            transform: `rotate(${isOpen ? 0 : '180deg'})`
          }}/>
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