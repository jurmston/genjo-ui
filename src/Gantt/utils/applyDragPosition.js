export function applyDragPosition({ dim, drag, options, containerRef, minX }) {
  if (!drag.mode) {
    return dim
  }

  const scrollDelta = containerRef.current.scrollLeft - drag.initialScroll
  const rawDeltaX = drag.x - drag.initialX + scrollDelta
  const snapOffset = rawDeltaX % options.columnWidth
  const deltaX = rawDeltaX - snapOffset

  switch (drag.mode) {
    case 'bar': {
      return {
        x: Math.max(minX, dim.x + deltaX),
        y: dim.y,
        width: dim.width,
        progress: dim.progress,
      }
    }

    case 'start': {
      const w = Math.max(dim.width - deltaX, options.columnWidth)

      return {
        x: Math.max(minX, dim.x + Math.min(deltaX, dim.width - options.columnWidth)),
        y: dim.y,
        width: w,
        progress: dim.progress,
      }
    }

    case 'end': {
      const w = Math.max(options.columnWidth, dim.width + deltaX)
      return {
        y: dim.y,
        x: dim.x,
        width: w,
        progress: dim.progress,
      }
    }

    case 'progress': {
      const progress = Math.max(
        0,
        Math.min(
          dim.width,
          dim.progress + rawDeltaX,
        )
      )

      return {
        y: dim.y,
        x: dim.x,
        width: dim.width,
        progress,
      }
    }

    default: {
      return dim
    }
  }
}
