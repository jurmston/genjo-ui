import * as React from 'react'

import { minMax, safeDivide } from '../utils/math'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import { fabClasses } from '@material-ui/core'


export function useResizableColumns({
  columns = [],
  minWidth: desiredMinWidth,
  maxWidth,
  defaultWidth,
  containerWidth = 0,
  hasScrollbar = false,
}) {
  const [widths, setWidths] = React.useState([])
  const [originalWidths, setOriginalWidths] = React.useState([])

  function getColumnWidth(index) {
    if (index === 0) {
      return 36
    }

    return widths[index - 1] ?? 0
  }

  const calculateWidths = React.useCallback(
    () => {
      const scrollbarWidth = hasScrollbar ? scrollbarSize() : 0
      // Divide the containerWidth into equal parts.
      const netContainerWidth = containerWidth - scrollbarWidth - 36
      const partitionWidth = safeDivide(netContainerWidth, columns.length)

      const minWidth = Math.min(desiredMinWidth, partitionWidth)

      let slack = netContainerWidth - columns.length * minWidth

      const newWidths = columns.map((column, index) => {
        const targetWidth = minMax(
          minWidth,
          column?.width ?? defaultWidth,
          maxWidth,
        )

        const slackNeeded = targetWidth - minWidth
        const slackAvailable = Math.min(slackNeeded, slack)

        slack -= slackAvailable

        const remainder = index === columns.length - 1
          ? slack - scrollbarSize()
          : 0

        return minWidth + slackAvailable + remainder

      })

      return newWidths
    },
    [columns, defaultWidth, desiredMinWidth, maxWidth, containerWidth]
  )

  // Syncronize widths to changes in the column set.
  React.useEffect(
    () => {
      const newWidths = calculateWidths()
      setWidths([ ...newWidths ])
      setOriginalWidths([ ...newWidths ])
    },
    [columns, defaultWidth, containerWidth]
  )

  return {
    widths,
    getColumnWidth,
  }
}
