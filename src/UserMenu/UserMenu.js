import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Menu from '@material-ui/core/Menu'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { colors } from '../ThemeProvider'

import DownArrow from '@material-ui/icons/KeyboardArrowDownRounded'


const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    height: props => props.height,
    backgroundColor: props => props.isOpen
      ? theme.palette.grey[200]
      : theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 3,
    paddingLeft: 24,
    paddingRight: 24,
  },

  menu: {
    // zIndex: theme.zIndex.drawer + 2,
    // position: 'fixed',
    marginTop: 8,
    marginRight: 4,
    // borderRadius: theme.shape.borderRadius,
    // maxHeight: props => props.isOpen ? 'unset' : 0,
    // boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
    // borderStyle: 'solid',
    // borderColor: theme.palette.divider,
    // borderWidth: props => props.isOpen ? 1 : 0,
    // Make sure we don't see the border when the menu is collapsed.
  },

  avatar: {
    height: props => props.height * (props.avatarOnly ? 0.8 : 0.6),
    width: props => props.height * (props.avatarOnly ? 0.8 : 0.6),
    fontSize: props => props.height * (props.avatarOnly ? 0.5 : 0.3),
    backgroundColor: props => props.color,
  },

  name: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
    marginLeft: 8,
    ...theme.typography.subtitle2,
  },
}))


export const UserMenu = ({
  color = colors.indigo[500],
  avatar,
  initials,
  name,
  children,
  avatarOnly = false,
  height = 55,
}) => {
  const [anchor, setAnchor] = React.useState(null)
  const isOpen = Boolean(anchor)
  const classes = useStyles({ isOpen, color, avatarOnly, height })

  return (
    <ClickAwayListener
      onClickAway={() => isOpen && setAnchor(null)}
    >
      <ButtonBase
        id="user-menu"
        className={classes.button}
        onClick={event => {
          event.stopPropagation()
          setAnchor(anchor ? null : event.currentTarget)
        }}
      >
        <Avatar
          className={classes.avatar}
          src={avatar}
          alt={name}
        >
          {initials}
        </Avatar>
          {Boolean(name) && !avatarOnly && (
            <span className={classes.name}>
              {name}
              <DownArrow />
            </span>
          )}
          <Menu
            className={classes.menu}
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            {children}
          </Menu>
      </ButtonBase>
    </ClickAwayListener>

  )
}

UserMenu.propTypes = {
  color: PropTypes.string,
  avatar: PropTypes.string,
  initials: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  avatarOnly: PropTypes.bool,
}
