import * as React from 'react'
import { useGantt } from './useGantt'
import clsx from 'clsx'
import { lighten, darken } from '@mui/material/styles'

import checkIcon from './icons/check.svg'

import { GanttDependencyHandle } from './GanttDependencyHandle'
import { GanttResizeHandle } from './GanttResizeHandle'


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

  const lightColor = lighten(task.color, 0.5)
  const darkColor = darken(task.color, 0.25)
  const iconSize = 12

  const dragIntervalRef = React.useRef(null)

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

  return (
    <g
      className="GenjoGantt__bar-wrapper"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <g className="GenjoGantt__bar-group">
        {/* Underbar used to pickup the hover event in the gap between bar and handles */}
        <rect
          x={x - 10}
          y={y - 1}
          width={width + 20 + 38}
          height={barHeight + 2}
          style={{
            opacity: 0,
          }}
        />

        <rect
          x={x}
          y={y + 4}
          width={width}
          height={barHeight - 8}
          rx={(barHeight - 8) / 2}
          ry={(barHeight - 8) / 2}
          className="GenjoGantt__bar"
          style={{
            fill: isDone ? task.color : lightColor,
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
              y={y}
              width={width}
              height={barHeight}
              rx={4}
              ry={4}
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
                y={y + 4 + (isSelected ? 1 : 0)}
                width={width - (isSelected ? 2 : 0)}
                height={barHeight - 8 - (isSelected ? 2 : 0)}
                rx={(barHeight - 8) / 2}
                ry={(barHeight - 8)/ 2}
              />
            </clipPath>

            <rect
              clipPath={`url(#clip-task-progress-${task.id})`}
              x={x}
              y={y}
              width={progressWidth}
              height={barHeight}
              className="GenjoGantt__progress"
              style={{
                fill: task.color,
              }}
            />
          </>
        )}

        {isDone && (
          <>
            <circle
              r={8}
              cx={x + width}
              cy={y}
              style={{
                fill: '#fff',
                stroke: darkColor,
                strokeWidth: 2,
              }}
            />

            <image
              href={checkIcon}
              x={x + width - iconSize / 2}
              y={y - iconSize / 2}
              height={iconSize}
              width={iconSize}
              style={{
                filter: 'invert(57%) sepia(93%) saturate(397%) hue-rotate(90deg) brightness(91%) contrast(89%)',
              }}
            />
          </>
        )}

        <text
          x={x + width + 10}
          y={y + barHeight / 2}
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
            />
          )}

          {!hideEndHandle && (
            <GanttResizeHandle
              task={task}
              position="end"
            />
          )}

          {!hideProgressHandle && (
            <circle
              onMouseDown={handleHandleMouseDown('progress')}
              r={5}
              cx={x + progressWidth}
              cy={y + barHeight}
              className={clsx(
                'GenjoGantt__progressHandle',
                Boolean(drag?.taskId === task.id) && 'GenjoGantt__handle_dragging',
              )}
              style={{
                fill: task.color,
              }}
            />
          )}

          {!hideDepHandle && (
            <g
              onMouseDown={event => startDepDrag(event, task.id, x + width, y + barHeight / 2)}
              className={clsx(
                'GenjoGantt__depHandle',
                Boolean(false) && 'GenjoGantt__handle_dragging',
              )}
            >
              <GanttDependencyHandle
                x={x + width + 22}
                y={y + barHeight / 2}
              />
            </g>
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
