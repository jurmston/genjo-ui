import * as React from 'react'

export function useSelectionSet(key = '', rowCount = 0, deps = []) {
  const [selected, setSelected] = React.useState(new Set())

  const unselectAll = React.useCallback(
    () => {
      setSelected(new Set())
    },
    [],
  )

  const selectAll = React.useCallback(
    () => {
      setSelected(new Set(Array.from({ length: rowCount }).map((_, index) => index)))
    },
    [rowCount]
  )

  /**
   * If either no items, or some but not all, are selected, all of the items
   * will be selected. If all the items are selected, then all of them will be
   * unselected.
   */
  const toggleAll = React.useCallback(
    () => {
      if (selected.size < rowCount) {
        selectAll()
      } else {
        unselectAll()
      }
    },
    [selectAll, unselectAll, selected, rowCount],
  )

  const toggle = React.useCallback(
    index => {
      const newSelected = new Set(selected)

      if (newSelected.has(index)) {
        newSelected.delete(index)
      } else {
        newSelected.add(index)
      }

      return setSelected(newSelected)
    },
    [selected]
  )

  // Reset the selected set any time the key or row count changes.
  React.useEffect(() => {
    setSelected(new Set())
  }, [key, rowCount, ...deps])

  return {
    selected,
    toggleAll,
    toggle,
    selectAll,
    unselectAll,
  }
}

export default useSelectionSet
