import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { UserMenu } from './UserMenu'


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'fixed',
    top: 0,
    height: 48,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[4],
  },

  logoLink: {
    height: 42,
    marginLeft: 24,
    cursor: 'pointer',
  },

  logo: {
    height: '100%',
    width: 'auto',
  },

  tabContainer: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    top: 48,
    left: 0,
    right: 0,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  tabs: {
    maxHeight: 48,
  },

  tab: {
    minWidth: 64,
    minHeight: 48,
    maxHeight: 48,
    padding: 0,
    textTransform: 'none',
    fontSize: 10,
    '&::first-of-type': {
      marginBottom: 0,
    },
  },

  icon: {
    marginBottom: 0,
  }

}))


/**
 * Desktop App Bar
 */
function AppBar({ children, logo, name, homeLink, userMenu }) {
  const classes = useStyles()

  return (
    <div className={classes.appBar}>
      <a href={homeLink} className={classes.logoLink}>
        <img
          alt={name}
          src={logo}
          className={classes.logo}
        />
      </a>

      {children}

      <div style={{ flex: 1 }} />

      {userMenu}
    </div>
  )
}

export { AppBar }
