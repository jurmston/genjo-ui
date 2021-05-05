import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import ShellContext from './ShellContext'

import { AppBar } from './components/AppBar'
import { MenuPanel } from './components/MenuPanel'
import { UserMenu } from './components/UserMenu'

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
  children,
  defaultTitle = '',
  logo,
  brandName,
  user,
  userMenuContent,
  appBarContent,
  defaultMenuContent,
}) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const [menuContent, setMenuContent] = React.useState(null)
  const [title, setTitle] = React.useState(defaultTitle)

  const hasMenu = Boolean(menuContent)
  const classes = useStyles({ hasMenu, menuIsOpen })

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

  return (
    <ShellContext.Provider value={{ setMenuContent, setTitle }}>
      <AppBar logo={logo} brandName={brandName} userMenu={<UserMenu user={user}>{userMenuContent}</UserMenu>}>
        {appBarContent}
      </AppBar>

      <MenuPanel isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} hasContent={Boolean(menuContent)}>
        {menuContent}
      </MenuPanel>

      <main className={classes.main}>{children}</main>
    </ShellContext.Provider>
  )
}

Shell.propTypes = {
  /** Content inside the shell. */
  children: PropTypes.node,
  defaultMenuContent: PropTypes.node,
  defaultTitle: PropTypes.string,
  logo: PropTypes.string,
  brandName: PropTypes.string,
  user: PropTypes.object,
  userMenuContent: PropTypes.node,
  appBarContent: PropTypes.node,
}

export default Shell
