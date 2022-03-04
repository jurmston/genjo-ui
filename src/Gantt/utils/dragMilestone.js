import { minMax } from '../../utils/math'


export function dragMilestone({ task, milestone, drag, options, containerRef }) {
  const { originalDimensions, minX, maxX } = milestone
  const { x, y } = originalDimensions

  if (!drag.mode) {
    return
  }

  const scrollDelta = containerRef.current.scrollLeft - drag.initialScroll
  const rawDeltaX = drag.x - drag.initialX + scrollDelta
  const snapOffset = rawDeltaX % options.columnWidth
  const deltaX = rawDeltaX - snapOffset

  switch (drag.mode) {
    case 'bar': {
      const newX = x + task.dimensions.x - task.originalDimensions.x
      milestone.dimensions.x = newX
      return
    }

    case 'milestone': {
      const newX = minMax(
        minX,
        x + deltaX,
        maxX,
      )

      milestone.dimensions.x = newX
      return
    }

    default: {
      return
    }
  }
}
