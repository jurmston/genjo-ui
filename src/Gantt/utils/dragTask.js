import { minMax } from '../../utils/math'


export function dragTask({ task, drag, options, containerRef }) {
  const { originalDimensions, minX, minMilestoneX, maxMilestoneX } = task
  const { x, width, y, progressWidth } = originalDimensions
  const endX = x + width

  if (!drag.mode) {
    return
  }

  const scrollDelta = containerRef.current.scrollLeft - drag.initialScroll
  const rawDeltaX = drag.x - drag.initialX + scrollDelta
  const snapOffset = rawDeltaX % options.columnWidth
  const deltaX = rawDeltaX - snapOffset

  switch (drag.mode) {
    case 'bar': {
      const newX = Math.max(minX, x + deltaX)
      task.dimensions.x = newX
      return
    }

    case 'start': {
      const newX = minMax(
        minX,
        x + deltaX,
        Math.min(endX - options.columnWidth, minMilestoneX),
      )

      const newWidth = endX - newX
      task.dimensions.x = newX
      task.dimensions.width = newWidth
      task.dimensions.progressWidth = newWidth * task.progress / 100
      return
    }

    case 'end': {
      const newEndX = Math.max(
        Math.max(x + options.columnWidth, maxMilestoneX),
        endX + deltaX,
      )

      const newWidth = newEndX - x
      task.dimensions.width = newWidth
      task.dimensions.progressWidth = newWidth * task.progress / 100
      return
    }

    case 'progress': {
      const newProgressWidth = minMax(
        0,
        progressWidth + rawDeltaX,
        width,
      )

      task.dimensions.progressWidth = newProgressWidth

      return
    }

    default: {
      return
    }
  }
}
