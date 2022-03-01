import * as React from 'react'
import { useGantt } from './useGantt'


function GanttTaskInner({
  index,
  task,
}) {
  const { options, startDrag } = useGantt()
  const { barHeight, handleWidth, handleBuffer } = options

  const { width, x, y, progress } = task.dimensions

  const progressPolygonPoints = React.useMemo(() => [
      x + progress - 5,
      y + barHeight,
      x + progress + 5,
      y + barHeight,
      x + progress,
      y + barHeight - 8.66,
    ].join(','), [x, progress, y, barHeight])

  // Manage mouse events for dragging
  // function handleMouseDown(event, dragMode) {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   // setDrag({
  //   //   mode: dragMode,
  //   //   initialX: event.clientX,
  //   //   x: event.clientX,
  //   //   initialScroll: containerRef.current?.scrollLeft ?? 0,
  //   // })
  // }

  // function handleMouseMove(event) {
  //   if (!drag.mode) {
  //     return
  //   }

  //   // Check if scroll should be triggered
  //   handleScroll(event, containerRef)

  //   console.log({ drag, move: true })

  //   // setDrag(d => ({
  //   //   ...d,
  //   //   x: event.clientX,
  //   // }))

  // }

  // function handleMouseUp(event) {
  //   if (drag === 'progress') {
  //     // onProgressChange?.(Math.round(100 * progress / width))
  //   } else {
  //     const finalDim = applyDragPosition({
  //       dim: getBarDimensions({ index, start, task, options }),
  //       drag: { ...drag, x: event.clientX },
  //       options,
  //       containerRef,
  //     })

  //     const daysFromStart = Math.floor(finalDim.x / options.columnWidth)
  //     const taskDays = Math.floor(finalDim.width / options.columnWidth)

  //     const newStart = start.plus({ days: daysFromStart })

  //     const newEnd = start.plus({ days: daysFromStart + taskDays })

  //     onDateChange?.(newStart, newEnd)
  //   }

  //   // setDrag(d => ({ ...d, mode: '' }))
  // }

  // React.useEffect(
  //   () => {
  //     if (drag.mode) {
  //       console.log(`Adding listeners for ${drag.mode}`)
  //       window.addEventListener('mousemove', handleMouseMove)
  //       window.addEventListener('mouseup', handleMouseUp)

  //       return () => {
  //         console.log(`Removing listeners for ${drag.mode}`)
  //         window.removeEventListener('mousemove', handleMouseMove)
  //         window.removeEventListener('mouseup', handleMouseUp)
  //       }
  //     }
  //   },
  //   [drag.mode]
  // )

  // const hideStartHandle = Boolean(drag.mode) && drag.mode !== 'start'
  // const hideEndHandle = Boolean(drag.mode) && drag.mode !== 'end'
  // const hideProgressHandle = Boolean(drag.mode) && drag.mode !== 'progress'

  const hideStartHandle = false
  const hideEndHandle = false
  const hideProgressHandle = false

  return (
    <g
      className="GenjoGantt__bar-wrapper"
      onMouseDown={event => startDrag(event, task.id, 'bar')}
    >
      <g className="GenjoGantt__bar-group">
        <rect
          x={x}
          y={y}
          width={width}
          height={barHeight}
          rx={4}
          ry={4}
          className="GenjoGantt__bar"
        />

        <rect
          x={x}
          y={y}
          width={progress}
          height={barHeight}
          rx={4}
          ry={4}
          className="GenjoGantt__progress"
        />

        <text
          x={x + width / 2}
          y={y + barHeight / 2}
          className="GenjoGantt__label"
        >
          {task.label}
        </text>
      </g>

      <g className="GenjoGantt__handle-group">
        {!hideStartHandle && (
          <rect
            onMouseDown={event => startDrag(event, task.id, 'start')}
            x={x + 1}
            y={y + 1}
            width={handleWidth}
            height={barHeight - handleBuffer}
            rx={3}
            ry={3}
            className="GenjoGantt__handle"
          />
        )}

        {!hideEndHandle && (
          <rect
            onMouseDown={event => startDrag(event, task.id, 'end')}
            x={x + width - handleWidth - 1}
            y={y + 1}
            width={handleWidth}
            height={barHeight - handleBuffer}
            rx={3}
            ry={3}
            className="GenjoGantt__handle"
          />
        )}

        {!hideProgressHandle && (
          <polygon
            onMouseDown={event => startDrag(event, task.id, 'progress')}
            points={progressPolygonPoints}
            className="GenjoGantt__handle"
          />
        )}
      </g>

      {/*task.dependencies.map((dep, depIndex) => (
        <GanttArrow
          key={`${depIndex}__${dep.taskId}__${task.id}`}
          dep={dep}
          toIndex={index}
          toDim={{ x, y, width }}
        />
      ))*/}
    </g>
  )
}


function taskPropsAreEqual(prevProps, nextProps) {
  return Boolean(nextProps.task.drawKey)
    && prevProps.task.drawKey === nextProps.task.drawKey
}


export const GanttTask = React.memo(GanttTaskInner, taskPropsAreEqual)
