import * as React from 'react'
import { useGantt } from './useGantt'
import clsx from 'clsx'
import { lighten, darken } from '@mui/material/styles'

import checkIcon from './icons/check.svg'

import { GanttDependencyHandle } from './GanttDependencyHandle'
import { GanttResizeHandle } from './GanttResizeHandle'

import { colors } from '../ThemeProvider'


const MAX_USERS = 3


const defaultTaskColor = colors.stone[400]

const taskColorsByStatus = {
  IN_PROGRESS: colors.indigo[500],
  DONE: colors.green[500],
  STUCK: colors.red[400],
  ON_HOLD: colors.yellow[400],
}


function GanttTaskInner({
  index,
  task,
}) {
  const {
    start,
    options,
    startDrag,
    drag,
    containerRef,
    handleTaskClick,
    containerDim,
    startDepDrag,
    depDrag,
    onAddDependency,
    users,
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

  const { width, x, y } = task.dimensions
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

  const hideStartHandle = Boolean(drag?.mode || depDrag) && drag?.mode !== 'start'
  const hideEndHandle = Boolean(drag?.mode || depDrag) && drag?.mode !== 'end'
  const hideDepHandle = Boolean(drag?.mode || depDrag)

  const color = taskColorsByStatus[task.status] || defaultTaskColor
  const darkColor = darken(color, 0.25)
  const iconSize = 12

  const dragIntervalRef = React.useRef(null)

  const isFaded = React.useMemo(
    () => {
      const dragCondition = Boolean(drag)
        && (![task.project, task.phase, task.id].includes(drag?.draggableId))

      const depDragCondition = false

      return dragCondition || depDragCondition
    },
    [drag, depDrag, task]
  )

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
      style={{ opacity: isFaded ? 0.5 : 1 }}
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
          y={y}
          width={width}
          height={barHeight}
          rx={4}
          ry={4}
          className="GenjoGantt__bar"
          style={{
            fill: color,
          }}
        />

        <g className="GenjoGantt__label_group">
          {task?.users?.map((userId, userIndex) => {
            const user = users[userId]

            return (
              <React.Fragment key={user.id}>
                <circle
                  key={user.id}
                  cx={x + width + 48 + (task.users.length - userIndex - 1) * 16}
                  cy={y + barHeight / 2}
                  r={12}
                  style={{
                    stroke: '#fff',
                    strokeWidth: 2,
                    fill: user.color,
                  }}
                />

                <text
                  x={x + width + 48 + (task.users.length - userIndex - 1) * 16}
                  y={y + barHeight / 2}
                  style={{
                    textAnchor: 'middle',
                    dominantBaseline: 'central',
                    fill: '#fff',
                    fontSize: 10,
                  }}
                >
                  {user.fullName.slice(0, 2).toUpperCase()}
                </text>

                {Boolean(user.avatar) && (
                  <>
                    <clipPath id={`task-user-${task.id}-${user.id}`}>
                      <circle
                        key={user.id}
                        cx={x + width + 48 + (task.users.length - userIndex - 1) * 16}
                        cy={y + barHeight / 2}
                        r={12}
                      />
                    </clipPath>

                    <image
                      href={user.avatar}
                      clipPath={`url(#task-user-${task.id}-${user.id})`}
                      x={x + width + 48 + (task.users.length - userIndex - 1) * 16 - 12}
                      y={y + barHeight / 2 - 12}
                      height={24}
                      width={24}
                      style={{

                      }}
                    />
                  </>
                )}



              </React.Fragment>
            )
          })}

          <text
            x={x + width + 48 + (task?.users?.length * 16) + (task?.users?.length > 0 ? 4 : 0)}
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
                color={darkColor}
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


export const GanttTask = React.memo(GanttTaskInner, taskPropsAreEqual)
