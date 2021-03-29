import * as React from 'react'

import { minMax } from 'src/utils/minMax'



export function useResizableColumns({
  columns = [],
  minWidth = 1,
  maxWidth = 100,
  defaultWidth = 75,
  fixedColumnCount = 0,
  containerWidth = 0,
}) {
  const [widths, setWidths] = React.useState([])
  // const [originalWidths, setOriginalWidths] = React.useState([])

  // Syncronize widths to changes in the column set.
  React.useEffect(
    () => {
      const newWidths = columns.map(column => column?.width ?? defaultWidth)
      setWidths([ ...newWidths ])
      // setOriginalWidths([ ...newWidths ])
    },
    [columns, defaultWidth]
  )

  const handleResizeColumn = React.useCallback(
    ({ columnIndex, deltaX }) => {
      setWidths([
        ...widths.slice(0, columnIndex),
        minMax(minWidth, maxWidth, widths[columnIndex] + deltaX),
        ...widths.slice(columnIndex + 1),
      ])
    },
    // Listening to the widths value will cause a performance hit.
    // eslint-disable-next-line
    [widths, minWidth, maxWidth]
  )

  let totalWidth = 0
  let fixedColumnWidth = 0
  widths.forEach((width, index) => {
    totalWidth += width

    if (index < fixedColumnCount) {
      fixedColumnWidth += width
    }
  })

  return {
    widths,
    handleResizeColumn,
    fixedColumnWidth,
    totalWidth,
  }
}
