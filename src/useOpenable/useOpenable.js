import * as React from 'react'


export function useOpenable(defaultState = false) {
  const [isOpen, setIsOpen] = React.useState(defaultState)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function toggle() {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

export default useOpenable
