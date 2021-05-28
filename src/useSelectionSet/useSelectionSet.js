import * as React from 'react'

export function useSelectionSet(deps = []) {
  // Mode = include | exclude
  const [mode, setMode] = React.useState('include')

  const [selected, setSelected] = React.useState(new Set())

  // Converts the mode to `include`
  const unselectAll = React.useCallback(
    () => {
      setMode('include')
      setSelected(new Set())
    },
    [],
  )

  // Converts the mode to `exclude`
  const selectAll = React.useCallback(
    () => {
      setMode('exclude')
      setSelected(new Set())
    },
    []
  )

  const toggle = React.useCallback(
    value => {
      const newSelected = new Set(selected)

      if (newSelected.has(value)) {
        newSelected.delete(value)
      } else {
        newSelected.add(value)
      }

      return setSelected(newSelected)
    },
    [selected]
  )

  const selectMany = React.useCallback(
    values => {
      const newSelected = new Set([ ...selected, ...values ])
      setSelected(newSelected)
    },
    [selected]
  )

  const unselectMany = React.useCallback(
    values => {
      const newSelected = new Set(selected)
      values.forEach(value => newSelected.delete(value))
      setSelected(newSelected)
    },
    [selected]
  )

  const toggleMode = React.useCallback(
    () => {
      setSelected(new Set())
      setMode(mode === 'include' ? 'exclude' : 'include')
    },
    [mode]
  )

  // Reset the selected set any time the key or row count changes.
  React.useEffect(() => {
    setMode('include')
    setSelected(new Set())
  }, [...deps])

  return {
    mode,
    selected,
    toggle,
    selectAll,
    unselectAll,
    toggleMode,
    selectMany,
    unselectMany,
  }
}

export default useSelectionSet
