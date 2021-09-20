import * as React from 'react'
import ShellContext from './ShellContext'

export const useShell = ({ title = '', menuContent = null, deps = [] }) => {
  const { setMenuContent, setTitle, toggleMenu } = React.useContext(ShellContext)

  React.useEffect(
    () => {
      setMenuContent(menuContent)
      setTitle(title)
    },
    [...deps]
  )

  return { toggleMenu }
}

export default useShell
