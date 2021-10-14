import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { DateTime } from 'luxon'
// import COMPONENT from '@material-ui/core/COMPONENT'
import './styles.css'


const COLUMN_WIDTH = 38
const HEADER_HEIGHT = 50
const PADDING = 16
const BAR_HEIGHT = 28
const BUFFER = 100
const HEADER_BUFFER = 10
const HANDLE_WIDTH = 6
const HANDLE_BUFFER = 3
const ARROW_CURVE = 5


function getBarDimensions({ task, start }) {
  const deltaDays = task.start.diff(start).as('days')
  const numDays = task.end.diff(start).as('days')

  const height = BAR_HEIGHT
  const width = numDays * COLUMN_WIDTH
  const x = deltaDays * COLUMN_WIDTH
  const y = HEADER_HEIGHT + PADDING + task.index * (height + PADDING)

  return { height, width, x, y }
}


function Bar({ start, task: taskFromProps, index }) {

  const [task, setTask] = React.useState(taskFromProps)
  const [isResizing, setIsResizing] = React.useState(false)
  const [initialX, setInitialX] = React.useState(xFromProps)
  const [x, setX] = React.useState(xFromProps)

  console.log({ start })

  const { height, width, x: xFromProps, y } = React.useMemo(
    () => getBarDimensions({ start, task }),
    [task, start],
  )

  React.useEffect(
    () => {
      setTask(taskFromProps)
      setInitialX(xFromProps)
      setX(xFromProps)
      setIsResizing(false)
    },
    [taskFromProps, xFromProps]
  )

  function handleMouseDown() {
    setInitialX(x)
    setIsResizing(true)
  }

  function handleMouseMove(event) {
    setX(event.clientX)
  }

  function handleMouseUp() {
    setIsResizing(false)
  }

  React.useEffect(
    () => {
      if (isResizing) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseup', handleMouseUp)
        }
      }
    },
    [isResizing]
  )

  const progress = task.progress / 100
  const progressWidth = width * progress

  const progressPolygonPoints = [
    x + progressWidth - 5,
    y + height,
    x + progressWidth + 5,
    y + height,
    x + progressWidth,
    y + height - 8.66,
  ].join(',')

  return (
    <g className="GenjoGantt__bar-wrapper">
      <g className="GenjoGantt__bar-group">
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={4}
          ry={4}
          className="GenjoGantt__bar"
        />

        <rect
          x={x}
          y={y}
          width={progressWidth}
          height={height}
          rx={4}
          ry={4}
          className="GenjoGantt__progress"
        />

        <text
          x={x + width / 2}
          y={y + height / 2}
          className="GenjoGantt__label"
        >
          {task.label}
        </text>
      </g>

      <g className="GenjoGantt__handle-group">
        <rect
          x={x + width - HANDLE_WIDTH}
          y={y + 1}
          width={HANDLE_WIDTH}
          height={height - HANDLE_BUFFER}
          rx={3}
          ry={3}
          className="GenjoGantt__handle"
        />

        <rect
          onMouseDown={handleMouseDown}
          x={x + 1}
          y={y + 1}
          width={HANDLE_WIDTH}
          height={height - HANDLE_BUFFER}
          rx={3}
          ry={3}
          className="GenjoGantt__handle"
        />

        <polygon
          points={progressPolygonPoints}
          className="GenjoGantt__handle"
        />
      </g>
    </g>
  )
}


function Arrow({ start, dep }) {

  const fromDim = getBarDimensions({ start, task: dep.fromTask })
  const toDim = getBarDimensions({ start, task: dep.toTask })

  const path = React.useMemo(
    () => {
      let startX = fromDim.x + fromDim.width / 2

      const condition = () => toDim.x < startX + PADDING
        && startX > fromDim.x + PADDING

      while(condition()) {
        startX -= 10
      }

      const startY = HEADER_HEIGHT
        + BAR_HEIGHT
        + (PADDING + BAR_HEIGHT) * dep.fromTask.index
        + PADDING

      const endX = toDim.x - PADDING / 2

      const endY = HEADER_HEIGHT
        + BAR_HEIGHT / 2
        + (PADDING + BAR_HEIGHT) * dep.toTask.index
        + PADDING

      const fromIsBelowTo = dep.fromTask.index > dep.toTask.index

      const clockwise = fromIsBelowTo ? 1 : 0
      const curveY = fromIsBelowTo ? -ARROW_CURVE : ARROW_CURVE
      const offset = fromIsBelowTo
        ? endY + ARROW_CURVE
        : endY - ARROW_CURVE

      const down1 = PADDING / 2 - ARROW_CURVE
      const down2 = toDim.y + toDim.height / 2 - curveY

      const left = toDim.x - PADDING

      return toDim.x < fromDim.x + PADDING
        ? `
          M ${startX} ${startY}
          v ${down1}
          a ${ARROW_CURVE} ${ARROW_CURVE} 0 0 1 -${ARROW_CURVE} ${ARROW_CURVE}
          H ${left}
          a ${ARROW_CURVE} ${ARROW_CURVE} 0 0 ${clockwise} -${ARROW_CURVE} ${curveY}
          V ${down2}
          a ${ARROW_CURVE} ${ARROW_CURVE} 0 0 ${clockwise} ${ARROW_CURVE} ${curveY}
          L ${endX} ${endY}
          m -5 -5
          l 5 5
          l -5 5
        `
        : `
          M ${startX} ${startY}
          V ${offset}
          a ${ARROW_CURVE} ${ARROW_CURVE} 0 0 ${clockwise} ${ARROW_CURVE} ${curveY}
          L ${endX} ${endY}
          m -5 -5
          l 5 5
          l -5 5
        `
    },
    [fromDim, toDim],
  )

  return (
    <path
      d={path}
      className="GenjoGantt__arrow"
    />
  )
}


export function Gantt({
  tasks = [],
  mode = 'daily',
}) {

  const [state, setState] = React.useState({
    start: DateTime.now().minus({ days: 5 }),
    end: DateTime.now().plus({ days: 5 }),
    height: 0,
    width: 0,
    numDays: 0,
    dates: [],
  })

  const [tasksById, setTasksById] = React.useState({})
  React.useEffect(
    () => setTasksById(tasks.reduce((result, task, index) => {
      result[task.id] = {
        ...task,
        start: DateTime.fromISO(task.start).startOf('day'),
        end: DateTime.fromISO(task.end).startOf('day'),
        index,
      }

      return result
    }, {})),
    [tasks],
  )

  const dependencies = React.useMemo(
    () => {
      let result = []
      for (let task of tasks) {
        for (let dep of task.dependencies) {
          result.push({
            id: `${dep.taskId}__${task.id}`,
            fromTask: tasksById[dep.taskId],
            toTask: tasksById[task.id],
            type: dep.type ?? 'FINISH',
            buffer: dep.buffer ?? 0,
          })
        }
      }

      return result
    },
    [tasks]
  )

  React.useEffect(
    () => {
      let start = null
      let end = null

      for (let task of tasks) {
        const taskStart = DateTime.fromISO(task.start).startOf('day')
        const taskEnd = DateTime.fromISO(task.end).startOf('day')

        start = !start || taskStart < start
          ? taskStart
          : start

        end = !end || taskEnd > end
          ? taskEnd
          : end
      }

      const height = HEADER_HEIGHT
        + PADDING
        + tasks.length * (BAR_HEIGHT + PADDING)

      const startWithBuffer = start.minus({ days: 7 })
      const endWithBuffer = end.plus({ days: 7 })
      const numDays = endWithBuffer.diff(startWithBuffer).as('days')
      const dates = Array.from({ length: numDays }).map((_, index) =>
        startWithBuffer.plus({ days: index })
      )

      const width = dates.length * COLUMN_WIDTH

      setState({
        start: startWithBuffer,
        end: endWithBuffer,
        height,
        width,
        numDays,
        dates,
      })
    },
    [tasks]
  )

  const todayX = state.start
    ? DateTime.now().startOf('day').diff(state.start).as('days') * COLUMN_WIDTH
    : 0

  return (
    <div className="GenjoGantt__container">
      <svg width={state.width} height={state.height + PADDING + BUFFER} className="GenjoGantt__root">
        <g className="GenjoGantt__grid">
          <rect
            x={0}
            y={0}
            width={state.width}
            height={state.height}
            className="GenjoGantt__grid__background"
          />

          {/* ROWS LAYER */}
          <g>
            {tasks.map((task, index) => {
              const rowY = HEADER_HEIGHT + (PADDING / 2) + index * (BAR_HEIGHT + PADDING)

              return (
                <rect
                  key={`row__${task.id}`}
                  x={0}
                  y={rowY}
                  width={state.width}
                  height={BAR_HEIGHT + PADDING}
                  className="GenjoGantt__grid__row"
                />
              )
            })}
          </g>

          {/* LINES */}
          <g>
            {tasks.map((task, index) => {
              const rowY = HEADER_HEIGHT + (PADDING / 2) + index * (BAR_HEIGHT + PADDING)

              return (
                <line
                  key={`line__${task.id}`}
                  x1={0}
                  x2={state.width}
                  y1={rowY + BAR_HEIGHT + PADDING}
                  y2={rowY + BAR_HEIGHT + PADDING}
                  className="GenjoGantt__grid__line"
                />
              )
            })}
          </g>

          {/* HEADER */}
          <rect
            x={0}
            y={0}
            width={state.width}
            height={HEADER_HEIGHT + HEADER_BUFFER}
            className="GenjoGantt__grid__header"
          />

          {/* TICKS */}
          {state.dates.map((date, index)=> {

            // Put a border on monday and saturday
            const isThick = date.weekday === 1 || date.weekday === 6

            const tickX = COLUMN_WIDTH * index
            const tickY = HEADER_HEIGHT + PADDING / 2
            const tickHeight = (BAR_HEIGHT + PADDING) * tasks.length

            return (
              <path
                key={index}
                d={`M ${tickX} ${tickY} v ${tickHeight}`}
                className={clsx(
                  'GenjoGantt__grid__tick',
                  isThick && 'GenjoGantt__grid__thick-tick',
                )}
              />
            )
          })}

          {/* HIGHLIGHTS */}
          <rect
            x={todayX}
            y={0}
            width={COLUMN_WIDTH}
            height={(BAR_HEIGHT + PADDING) * tasks.length + HEADER_HEIGHT + PADDING / 2}
            className="GenjoGantt__grid__today-highlight"
          />
        </g>

        <g className="GenjoGantt__dates">
          {state.dates.map((date, index) => (
            <>
              {date.day === 1 && (
                <text
                x={index * COLUMN_WIDTH + COLUMN_WIDTH * date.daysInMonth / 2}
                y={HEADER_HEIGHT - 25}
                className="GenjoGantt__dates__upper-text"
                >
                  {date.toFormat('MMMM')}
                </text>
              )}

              <text
                y={HEADER_HEIGHT}
                x={index * COLUMN_WIDTH + COLUMN_WIDTH / 2}
                className="GenjoGantt__dates__lower-text"
              >
                {date.day}
              </text>
            </>
          ))}
        </g>

        <g className="GenjoGantt__arrow">
          {dependencies.map(dep => Boolean(dep.fromTask) && Boolean(dep.toTask) && (
            <Arrow key={dep.id} start={state.start} dep={dep} />
          ))}
        </g>

        <g className="GenjoGantt__progress">

        </g>

        <g className="GenjoGantt__bar">
          {tasks.map((task, index) => Boolean(tasksById[task.id]) && (
            <Bar
              key={task.id}
              task={tasksById[task.id]}
              index={index}
              start={state.start}
            />
          ))}
        </g>

        <g className="GenjoGantt__details">

        </g>
      </svg>
    </div>
  )
}

Gantt.propTypes = {
  mode: PropTypes.oneOf(['monthly', 'daily', 'weekly']),
}
