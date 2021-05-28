import * as React from 'react'

import { minMax } from '../utils/math'


export function useResizing({
  getColumnWidth,
  widths,
  columns,
  setColumns,
  minColumnWidth,
  maxColumnWidth,
}) {
  /**
   * dragInfo = {
   *   columnIndex:
   * }
   */
  const [dragInfo, setDragInfo] = React.useState({
    columnIndex: -1,
    left: 0,
    currentWidth: 0,
  })

  /**
   * Callback when the user starts resizing a column.
   * @param {number} columnIndex The index of the column being resized.
   */
  function startResizing(columnIndex) {
    const cumulativeWidth = widths.slice(0, columnIndex).reduce((result, width) => {
      return result + width
    }, 0)

    setDragInfo({
      columnIndex,
      left: cumulativeWidth,
      currentWidth: getColumnWidth(columnIndex),
    })
  }

  /**
   * Callback when the user has stopped resizing a column.
   */
  function stopResizing() {
    const newColumns = [...columns]
    newColumns[dragInfo.columnIndex].width = dragInfo.currentWidth
    setColumns(newColumns)
    setDragInfo({
      columnIndex: -1,
      left: 0,
      currentWidth: 0,
    })
  }

  /**
   * Callback when the column is being resized.
   * @param {number} deltaX The change in the x-position.
   */
  function onResize(deltaX) {
    setDragInfo({
      ...dragInfo,
      currentWidth: minMax(
        minColumnWidth,
        dragInfo.currentWidth + deltaX,
        maxColumnWidth,
      ),
    })
  }

  return {
    dragInfo,
    startResizing,
    stopResizing,
    onResize,
  }
}

export default useResizing
