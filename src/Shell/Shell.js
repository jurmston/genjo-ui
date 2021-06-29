import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import useStoredState from '../useStoredState'

import ShellContext from './ShellContext'
import { AppBar } from './AppBar'
import { MenuPanel } from './MenuPanel'


const MENU_CLOSED_WIDTH = 21
const MENU_OPEN_WIDTH = 256
const APP_BAR_HEIGHT = 56

const useStyles = makeStyles({
  main: {
    position: 'fixed',
    top: APP_BAR_HEIGHT,
    left: props => (!props.hasMenu || props.isMobile ? 0 : props.menuIsOpen ? MENU_OPEN_WIDTH : MENU_CLOSED_WIDTH),
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: `left 0.15s ease`,
  },
})

/**
 * Content wrapper for public website.
 */
export const Shell = ({
  appBarContent,
  avatar,
  brandName,
  children,
  color,
  defaultMenuContent,
  defaultTitle = '',
  homeLink,
  initials,
  logo,
  name,
  userMenu,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useStoredState({
    key: 'shell-menu-is-open',
    initialValue: 'true',
  })

  const [menuContent, setMenuContent] = React.useState(null)
  const [title, setTitle] = React.useState(defaultTitle)

  const hasMenu = Boolean(menuContent)
  const classes = useStyles({ hasMenu, menuIsOpen: menuIsOpen === 'true' })

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

  function toggleMenu() {
    const newState = menuIsOpen === 'true' ? 'false' : 'true'
    setMenuIsOpen(newState)
  }

  return (
    <ShellContext.Provider value={{ setMenuContent, setTitle }}>
      <AppBar
        logo={logo}
        homeLink={homeLink}
        brandName={brandName}
        userMenu={userMenu}
      >
        {appBarContent}
      </AppBar>

      <MenuPanel isOpen={menuIsOpen === 'true'} toggle={toggleMenu} hasContent={Boolean(menuContent)}>
        {menuContent}
      </MenuPanel>

      <main className={classes.main}>{children}</main>
    </ShellContext.Provider>
  )
}

Shell.propTypes = {
  appBarContent: PropTypes.node,
  avatar: PropTypes.string,
  brandName: PropTypes.string,
  /** Content inside the shell. */
  children: PropTypes.node,
  color: PropTypes.string,
  defaultMenuContent: PropTypes.node,
  defaultTitle: PropTypes.string,
  homeLink: PropTypes.string,
  initials: PropTypes.string,
  logo: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.object,
  userMenu: PropTypes.node,
}

export default Shell
