import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { AppBar } from './components/AppBar'
import { MenuPanel } from './components/MenuPanel'
import { UserMenu } from './components/UserMenu'


const MENU_CLOSED_WIDTH = 21
const MENU_OPEN_WIDTH = 256
const APP_BAR_HEIGHT = 48


const useStyles = makeStyles({
  main: {
    position: 'fixed',
    top: APP_BAR_HEIGHT,
    left: props => (!props.hasMenu || props.isMobile) ? 0 : props.menuIsOpen ? MENU_OPEN_WIDTH : MENU_CLOSED_WIDTH,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: `left 0.15s ease`,
  },
})


export const ShellContext = React.createContext()


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
}) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const [menuContent, setMenuContent] = React.useState(null)
  const [title, setTitle] = React.useState(defaultTitle)

  const hasMenu = Boolean(menuContent)
  const classes = useStyles({ hasMenu, menuIsOpen })

  // Synchronize document title
  React.useEffect(
    () => {
      document.title = title

      return () => document.title = defaultTitle
    },
    [title]
  )

  return (
    <ShellContext.Provider value={{ setMenuContent, setTitle }}>
      <AppBar
        logo={logo}
        brandName={brandName}
        userMenu={
          <UserMenu
            user={user}
          >
            {userMenuContent}
          </UserMenu>
        }
      >
        {appBarContent}
      </AppBar>

      <MenuPanel
        isOpen={menuIsOpen}
        setIsOpen={setMenuIsOpen}
        hasContent={Boolean(menuContent)}
      >
        {menuContent}
      </MenuPanel>

      <main className={classes.main}>
        {children}
      </main>
    </ShellContext.Provider>
  )
}

export const useShell = ({ title = '', menuContent = null }) => {
  const { setMenuContent, setTitle } = React.useContext(ShellContext)

  React.useEffect(
    () => {
      setMenuContent(menuContent)
      setTitle(title)
    },
    // This effect should only be called once.
    // eslint-disable-next-line
    [],
  )
}


/** HOC to wrap pages with Shell */
export const withShell = (Component, shellProps) => {
  const WrappedComponent = props => (
    <Shell {...shellProps}>
      <Component {...props} />
    </Shell>
  )

  return WrappedComponent
}


Shell.propTypes = {
  /** Content inside the shell. */
  children: PropTypes.node,
  menuContent: PropTypes.node,
  defaultTitle: PropTypes.string,
  logo: PropTypes.string,
  brandName: PropTypes.string,
  user: PropTypes.object,
  userMenuContent: PropTypes.node,
  appBarContent: PropTypes.node,
}
