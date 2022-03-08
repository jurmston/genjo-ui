import * as React from 'react'
import { useGantt } from './useGantt'
import clsx from 'clsx'
import { lighten, darken } from '@mui/material/styles'

import checkIcon from './icons/check.svg'

import { GanttResizeHandle } from './GanttResizeHandle'
import { colors } from '../ThemeProvider'


function GanttPhaseInner({
  index,
  task,
}) {
  const {
    start,
    options,
    startDrag,
    drag,
    containerRef,
    selectedId,
    handleTaskClick,
    containerDim,
    startDepDrag,
    depDrag,
    onAddDependency,
  } = useGantt()

  const {
    barHeight,
    handleWidth,
    handleBuffer,
    rowPadding,
    rowHeight,
    textSize,
    textPadding,
    textHeight,
  } = options

  const isProject = task.type === 'PROJECT'

  const { width, x, y, progressWidth } = task.dimensions
  // const progressPolygonPoints = React.useMemo(() => [
  //     x + progress - 5,
  //     y + barHeight,
  //     x + progress + 5,
  //     y + barHeight,
  //     x + progress,
  //     y + barHeight - 8.66,
  //   ].join(','), [x, progress, y, barHeight])

  const textRef = React.useRef(null)

  const isMissingDates = !task.hasStart || !task.hasEnd
  const isDone = task.status === 'DONE'
  const isSelected = selectedId === task.id

  const hideStartHandle = Boolean(drag?.mode || depDrag) && drag?.mode !== 'start'
  const hideEndHandle = Boolean(drag?.mode || depDrag) && drag?.mode !== 'end'
  const hideProgressHandle = isMissingDates || (Boolean(drag?.mode || depDrag) && drag?.mode !== 'progress')
  const hideDepHandle = Boolean(drag?.mode || depDrag)

  const color = isProject ? colors.emerald[600] : colors.emerald[400]
  const lightColor = lighten(color, 0.5)
  const darkColor = darken(color, 0.25)
  const iconSize = 12

  const dragIntervalRef = React.useRef(null)

  const isFaded = (selectedId && (![task.project, task.id].includes(selectedId)))
  || (drag && (![task.project, task.id].includes(drag?.draggableId)))

  const handleHandleMouseDown = handle => event => {
    event.preventDefault()
    event.stopPropagation()

    startDrag(event, task.id, handle)
  }

  /**
   * SVG does not support DOM drag events. Here we use mousedown to capture the
   * start of the click. If the mouseup event occurs before the drag interval,
   * we cancel starting the drag callback and instead run the click handler.
   *
   * The duration of the timeout should be set to be a undetectable to the end-
   * user as possible but still wide enough to capture slow clickers.
   */
  function handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()

    if (isDone) {
      return
    }

    clearInterval(dragIntervalRef.current)

    dragIntervalRef.current = setTimeout(
      () => {
        startDrag(event, task.id, 'bar')
      },
      300,
    )
  }

  function handleMouseUp(event) {
    if (drag) {
      return
    }

    if (depDrag) {
      if (depDrag.taskId === task.id) {
        return
      }

      onAddDependency(depDrag.taskId, task.id)
      return
    }

    clearInterval(dragIntervalRef.current)
    handleTaskClick(event, task.id)
  }

  const hDelta = isProject ? 4 : 8
  const height = barHeight - 2 * hDelta

  return (
    <g
      className="GenjoGantt__bar-wrapper"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ opacity: isFaded ? 0.5 : 1 }}
    >
      <g className="GenjoGantt__bar-group">
        {/* Underbar used to pickup the hover event in the gap between bar and handles */}
        <rect
          x={x - 10}
          y={y + hDelta - 1}
          width={width + 20 + 38}
          height={height + 2}
          style={{
            opacity: 0,
          }}
        />

        <rect
          x={x}
          y={y + hDelta}
          width={width}
          height={height}
          rx={height / 2}
          ry={height / 2}
          className="GenjoGantt__bar"
          style={{
            fill: isDone ? color : lightColor,
            stroke: darkColor,
            strokeWidth: isSelected ? 2 : 0,
          }}
        />

        {isMissingDates && !isDone && width !== progressWidth && (
          <>
            <pattern id={`${task.id}-no-dates-stripes`} patternUnits="userSpaceOnUse" width={20} height={20} patternTransform="rotate(135)">
              <line x1={0} y={0} x2={0} y2={20} stroke="rgb(255 255 255 / 35%)" strokeWidth={20} />
            </pattern>

            <rect
              x={x}
              y={y + hDelta}
              width={width}
              height={height}
              rx={height / 2}
              ry={height / 2}
              className="GenjoGantt__bar"
              style={{
                fill: `url(#${task.id}-no-dates-stripes)`,
                opactiy: 0.15,
              }}
            />
          </>
        )}

        {!isDone && !isMissingDates && (
          <>
            <clipPath id={`clip-task-progress-${task.id}`}>
              <rect
                x={x + (isSelected ? 1 : 0)}
                y={y + hDelta + (isSelected ? 1 : 0)}
                width={width - (isSelected ? 2 : 0)}
                height={height - (isSelected ? 2 : 0)}
                rx={height / 2}
                ry={height/ 2}
              />
            </clipPath>

            <rect
              clipPath={`url(#clip-task-progress-${task.id})`}
              x={x}
              y={y + hDelta}
              width={progressWidth}
              height={height}
              className="GenjoGantt__progress"
              style={{
                fill: color,
              }}
            />
          </>
        )}

        <text
          x={x + width + 10}
          y={y + hDelta + height / 2}
          className={clsx(
            'GenjoGantt__label',
          )}
          ref={textRef}
          style={{
            fontSize: textSize,
          }}
        >
          {task.label}
        </text>
      </g>

      {!isDone && (
        <g className="GenjoGantt__handle-group">
          {!hideStartHandle && (
            <GanttResizeHandle
              task={task}
              position="start"
              color={darkColor}
            />
          )}

          {!hideEndHandle && (
            <GanttResizeHandle
              task={task}
              position="end"
              color={darkColor}
            />
          )}

          {!hideProgressHandle && !isProject && (
            <circle
              onMouseDown={handleHandleMouseDown('progress')}
              r={5}
              cx={x + progressWidth}
              cy={y + hDelta + height}
              className={clsx(
                'GenjoGantt__progressHandle',
                Boolean(drag?.taskId === task.id) && 'GenjoGantt__handle_dragging',
              )}
              style={{
                fill: darkColor,
              }}
            />
          )}

        </g>
      )}
    </g>
  )
}


function taskPropsAreEqual(prevProps, nextProps) {
  return Boolean(nextProps.task.drawKey)
    && prevProps.task.drawKey === nextProps.task.drawKey
}


export const GanttPhase = React.memo(GanttPhaseInner, taskPropsAreEqual)
