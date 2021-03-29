import * as React from 'react'


export function useSelectionSet(key = '', rowCount = 0) {
  const [selected, setSelected] = React.useState(new Set())


  function unselectAll() {
    setSelected(new Set())
  }

  function selectAll() {
    setSelected(
      new Set(Array.from({ length: rowCount }).map((_, index) => index))
    )
  }

  /**
   * If either no items, or some but not all, are selected, all of the items
   * will be selected. If all the items are selected, then all of them will be
   * unselected.
   */
  function toggleSelectAll() {
    if (selected.size < rowCount) {
      return selectAll()
    }

    unselectAll()
  }

  function toggleSelectItem(index) {
    const newSelected = new Set(selected)

    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }

    return setSelected(newSelected)
  }

  // Reset the selected set any time the key or row count changes.
  React.useEffect(
    () => {
      setSelected(new Set())
    },
    [key, rowCount]
  )

  return {
    selected,
    toggleSelectAll,
    toggleSelectItem,
    selectAll,
    unselectAll,
  }
}