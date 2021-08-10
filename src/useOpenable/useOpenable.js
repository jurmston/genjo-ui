import * as React from 'react'


export function useOpenable(defaultState = false) {
  const [isOpen, setIsOpen] = React.useState(defaultState)

  const handlers = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(s => !s),
  }

  return [isOpen, handlers]
}

export default useOpenable
