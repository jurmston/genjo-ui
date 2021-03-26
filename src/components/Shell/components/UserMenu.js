import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ButtonBase from '@material-ui/core/ButtonBase'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'


const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    backgroundColor: props => props.isOpen
      ? theme.palette.grey[200]
      : theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 3,
    paddingLeft: 24,
    paddingRight: 24,
  },
  menu: {
    zIndex: theme.zIndex.drawer + 2,
    position: 'fixed',
    top: 48,
    right: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: 0,
    overflow: 'hidden',
  },

  avatar: {
    height: 32,
    width: 32,
    fontSize: 18,
    backgroundColor: theme.palette.primary.main,
  }
}))


const UserMenu = ({ user, children }) => {
  const [anchor, setAnchor] = React.useState(null)
  const isOpen = Boolean(anchor)
  const classes = useStyles({ isOpen })

  return (
    <ClickAwayListener
      onClickAway={() => isOpen && setAnchor(null)}
    >
      <ButtonBase
        id="user-menu"
        className={classes.button}
        onClick={event => setAnchor(anchor ? null : event.currentTarget)}
      >
        <Avatar
          className={classes.avatar}
          src={user?.photoUrl}
          alt={user?.name}
        >
          {user?.name?.[0] || 'JU'}
        </Avatar>

          <Paper
            className={classes.menu}
            style={{
              width: 256,
              maxHeight: isOpen ? 'unset' : 0,
            }}
          >
            {children}
          </Paper>
      </ButtonBase>
    </ClickAwayListener>

  )
}

export { UserMenu }
