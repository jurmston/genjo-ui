import { minMax, safeDivide } from '../../utils/math'


export function calculateWidths({
  widths,
  containerWidth,
  actionsWidth,
  checkboxWidth,
  minWidth,
  maxWidth,
}) {
  const count = widths.length

  // Divide the containerWidth into equal parts.
  const netContainerWidth = containerWidth
    // - scrollbarWidth
    // - 1
    - actionsWidth
    - checkboxWidth

  const partitionWidth = safeDivide(netContainerWidth, count)

  const actualMinColumnWidth = Math.min(minWidth, partitionWidth)

  // After accounting for the minimum possible width, this value tracks the
  // remaining width left to redistribute.
  let slack = netContainerWidth - count * actualMinColumnWidth

  const newWidths = widths.map((value, index) => {
    const targetWidth = minMax(
      actualMinColumnWidth,
      value ?? partitionWidth,
      maxWidth
    )

    const slackNeeded = targetWidth - actualMinColumnWidth
    const actualSlackUsed = Math.min(slackNeeded, slack)

    slack -= actualSlackUsed

    // If there are actions, the slack remaining should be applied to the
    // second to last column.
    const lastColumnIndex = count - 1

    const remainder = index === lastColumnIndex ? slack : 0

    return actualMinColumnWidth + actualSlackUsed + remainder
  })

  return newWidths
}
