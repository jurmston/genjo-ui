import * as React from 'react'

import { minMax, safeDivide } from '../utils/math'
import scrollbarSize from 'dom-helpers/scrollbarSize'

const CHECKBOX_WIDTH = 36


/**
 *
 * @param {object} params
 * @returns
 */
export function useColumnWidths({
  actionsWidth,
  columns = [],
  containerWidth = 0,
  defaultColumnWidth,
  hasScrollbar = false,
  maxColumnWidth,
  minColumnWidth: desiredMinColumnWidth,
}) {
  const [widths, setWidths] = React.useState([])

  function getColumnWidth(index) {
    return widths[index] ?? 0
  }

  const hasCheckbox = columns?.[0]?.type === 'checkbox'

  const numDataColumns = columns.length - +hasCheckbox - +Boolean(actionsWidth)

  const calculateWidths = React.useCallback(() => {
    // useDimensions will recalculate the container width when scrollbars are
    // present but react-window will not take the extra slack into account.
    // When there are NO scrollbars, we need to add the padding back in.
    const scrollbarWidth = hasScrollbar ? scrollbarSize() : 0

    // Divide the containerWidth into equal parts.
    const netContainerWidth = containerWidth
      - scrollbarWidth
      - 1
      - actionsWidth
      - (hasCheckbox ? CHECKBOX_WIDTH : 0)

    const partitionWidth = safeDivide(netContainerWidth, numDataColumns)

    const actualMinColumnWidth = Math.min(desiredMinColumnWidth, partitionWidth)

    // After accounting for the minimum possible width, this value tracks the
    // remaining width left to redistribute.
    let slack = netContainerWidth - numDataColumns * actualMinColumnWidth

    const newWidths = columns.map((column, index) => {
      // Handle `type === 'checkbox'` seperately to make sure it's width is
      // fixed. This will lead to a little extra slack on most screens since
      // the checkbox width is smaller than the min width.
      if (column.type === 'checkbox') {
        return CHECKBOX_WIDTH
      }

      if (column.type === 'actions') {
        return actionsWidth
      }

      const targetWidth = minMax(
        actualMinColumnWidth,
        column.width ?? defaultColumnWidth,
        maxColumnWidth
      )

      const slackNeeded = targetWidth - actualMinColumnWidth
      const slackAvailable = Math.min(slackNeeded, slack)

      slack -= slackAvailable

      // If there are actions, the slack remaining should be applied to the
      // second to last column.
      const lastDataColumnIndex = columns.length - (actionsWidth ? 2 : 1)

      const remainder = index === lastDataColumnIndex ? slack : 0

      return actualMinColumnWidth + slackAvailable + remainder
    })

    return newWidths
  }, [columns, defaultColumnWidth, desiredMinColumnWidth, maxColumnWidth, containerWidth])

  // Syncronize widths to changes in the column set and container dimensions.
  React.useEffect(() => {
    const newWidths = calculateWidths()
    setWidths([...newWidths])
  }, [columns, defaultColumnWidth, containerWidth])

  return {
    widths,
    getColumnWidth,
  }
}

export default useColumnWidths
