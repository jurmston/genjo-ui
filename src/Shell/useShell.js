import * as React from 'react'
import ShellContext from './ShellContext'

export const useShell = ({ title = '', menuContent = null }) => {
  const { setMenuContent, setTitle } = React.useContext(ShellContext)

  React.useEffect(
    () => {
      setMenuContent(menuContent)
      setTitle(title)
    },
    // This effect should only be calld once.
    // eslint-disable-next-linee
    []
  )
}

export default useShell
