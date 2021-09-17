import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import AppsIcon from '@material-ui/icons/AppsRounded'


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
    boxShadow: 'none',
    boxSizing: 'border-box',
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },

  logoLink: {
    height: 36,
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


  icon: {
    marginBottom: 0,
  }

}))


/**
 * Desktop App Bar
 */
export function MobileAppBar({ children, logo, brandName, homeLink, userMenu }) {
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

MobileAppBar.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.string,
  brandName: PropTypes.string,
  homeLink: PropTypes.string,
  userMenu: PropTypes.node,
}
