import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import AppsIcon from '@material-ui/icons/AppsRounded'


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'fixed',
    top: 0,
    height: 56,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  logoLink: {
    height: 52,
    marginLeft: 24,
    cursor: 'pointer',
  },

  textLink: {
    ...theme.typography.h1,
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.primary.dark,
    marginLeft: 24,
  },

  appsIcon: {
    fontSize: 24,
    marginRight: 8,
  },

  logo: {
    height: '100%',
    width: 'auto',
  },

  tabContainer: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    top: 56,
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
export function AppBar({ children, logo, brandName, homeLink, userMenu }) {
  const classes = useStyles()

  return (
    <div className={classes.appBar}>
      {logo ? (
        <a href={homeLink} className={classes.logoLink}>
          <img
            alt={brandName}
            src={logo}
            className={classes.logo}
          />
        </a>
      ) : (
        <a href={homeLink} className={classes.textLink}>
          <span><AppsIcon className={classes.appsIcon} /></span>
          {brandName}
        </a>
      )}

      {children}
      <div style={{ flex: 1 }} />

      {userMenu}
    </div>
  )
}

AppBar.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.string,
  brandName: PropTypes.string,
  homeLink: PropTypes.string,
  userMenu: PropTypes.node,
}
