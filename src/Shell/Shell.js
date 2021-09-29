import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import useStoredState from '../useStoredState'

import MenuIcon from '@material-ui/icons/MenuRounded'

import { useDevice } from '../DeviceProvider'

import ShellContext from './ShellContext'
import { AppBar } from './AppBar'
import { MobileAppBar } from './MobileAppBar'
import { MenuPanel } from './MenuPanel'
import { MobileMenuPanel } from './MobileMenuPanel'


const MENU_CLOSED_WIDTH = 21
const MENU_OPEN_WIDTH = 256
const APP_BAR_HEIGHT = 56
const MOBILE_APP_BAR_HEIGHT = 48
const MOBILE_NAVIGATION_HEIGHT = 36

const useStyles = makeStyles(theme => ({
  main: {
    position: 'fixed',
    top: props => props.isMobile ? MOBILE_APP_BAR_HEIGHT : APP_BAR_HEIGHT,
    left: props => !props.hasMenu || props.isMobile
      ? 0
      : props.menuIsOpen
      ? MENU_OPEN_WIDTH
      : MENU_CLOSED_WIDTH,
    right: 0,
    bottom: props => props.isMobile ? MOBILE_NAVIGATION_HEIGHT : 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: `left 0.15s ease`,
  },

  mobileNavigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `1px solid ${theme.palette.divider}`
  },
}))

/**
 * Content wrapper for public website.
 */
export const Shell = ({
  appBarContent,
  brandName,
  children,
  defaultMenuContent,
  defaultTitle = '',
  homeLink,
  logo,
  userMenu,
  mobileLogo,
  mobileUserMenu,
  mobileAppBarContent,
  mobileNavigation,
}) => {
  const { isMobile } = useDevice()

  const [menuIsOpen, setMenuIsOpen] = useStoredState({
    key: 'shell-menu-is-open',
    initialValue: 'true',
  })

  const [menuContent, setMenuContent] = React.useState(null)
  const [title, setTitle] = React.useState(defaultTitle)

  const hasMenu = Boolean(menuContent)
  const classes = useStyles({ isMobile, hasMenu, menuIsOpen: menuIsOpen === 'true' })

  // Synchronize document title
  React.useEffect(() => {
    document.title = title

    return () => (document.title = defaultTitle)
  }, [title])

  // Load the shell with the default menu content.
  React.useEffect(() => {
    if (defaultMenuContent) {
      setMenuContent(defaultMenuContent)
    }
  }, [defaultMenuContent])

  function toggleMenu(desiredState) {
    const newState = desiredState ?? (
      menuIsOpen === 'true'
        ? 'false'
        : 'true'
    )

    setMenuIsOpen(newState)
  }

  const AppBarComponent = isMobile ? MobileAppBar : AppBar

  const logoToUse = isMobile
    ? (mobileLogo ?? logo)
    : logo

  return (
    <ShellContext.Provider value={{ setMenuContent, setTitle, toggleMenu }}>
      <AppBarComponent
        logo={logoToUse}
        homeLink={homeLink}
        brandName={brandName}
        userMenu={isMobile ? mobileUserMenu : userMenu}
      >
        {isMobile? mobileAppBarContent : appBarContent}
      </AppBarComponent>

      {!isMobile ? (
        <MenuPanel isOpen={menuIsOpen === 'true'} toggle={toggleMenu} hasContent={Boolean(menuContent)}>
          {menuContent}
        </MenuPanel>
      ) : menuContent ? (
        <MobileMenuPanel isOpen={menuIsOpen === 'true'} toggle={toggleMenu}>
          {menuContent}
        </MobileMenuPanel>
      ) : null}

      <main className={classes.main}>{children}</main>

      {isMobile && Boolean(mobileNavigation) && (
        <nav className={classes.mobileNavigation}>
          {mobileNavigation}
        </nav>
      )}
    </ShellContext.Provider>
  )
}

Shell.propTypes = {
  appBarContent: PropTypes.node,
  brandName: PropTypes.string,
  /** Content inside the shell. */
  children: PropTypes.node,
  defaultMenuContent: PropTypes.node,
  defaultTitle: PropTypes.string,
  homeLink: PropTypes.string,
  logo: PropTypes.string,
  user: PropTypes.object,
  userMenu: PropTypes.node,
  mobileLogo: PropTypes.string,
  mobileUserMenu: PropTypes.node,
  mobileAppBarContent: PropTypes.node,
  mobileNavigation: PropTypes.node,
}

export default Shell
