import * as React from 'react'
import ShellContext from './ShellContext'

export const useShell = ({ title = '', menuContent = null, deps = [] }) => {
  const { setMenuContent, setTitle } = React.useContext(ShellContext)

  React.useEffect(
    () => {
      setMenuContent(menuContent)
      setTitle(title)
    },
    [...deps]
  )
}

export default useShell
