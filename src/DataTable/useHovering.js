import * as React from 'react'


export function useHovering() {
  const [hoveredState, setHoveredState] = React.useState([-1, -1])

  /**
   * Callback when a cell is hovered.
   * @param {number} rowIndex The row index of the cell.
   * @param {number} columnIndex The column index of the cell.
   */
  const onHover = React.useCallback(
    (rowIndex, columnIndex) => {
      setHoveredState([rowIndex, columnIndex])
    },
    []
  )

  return {
    hoveredState,
    onHover,
  }
}

export default useHovering
