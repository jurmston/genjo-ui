import * as React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import './styles.css'

import { safeDivide } from '../utils/math'
import { GanttContext } from './GanttContext'
import { GanttSvg } from './GanttSvg'
import { GanttTask } from './GanttTask'
import { GanttArrow } from './GanttArrow'
import {
  getBarDimensions,
  initializeStartAndEnd,
  initializeDrawOptions,
  handleScroll,
  applyDragPosition,
} from './utils'

const COLUMN_WIDTHS = {
  day: 38,
  week: 24,
  month: 10,
}

const BUFFER_DAYS = 360

const HEADER_HEIGHT = 50
const PADDING = 16
const BAR_HEIGHT = 28
const BUFFER = 100
const HEADER_BUFFER = 10
const HANDLE_WIDTH = 6
const HANDLE_BUFFER = 3
const ARROW_CURVE = 5


function calculateTaskBoundries(tasks) {
  const result = {}

  // First pass, min/max of each task
  for (let task of tasks) {
    result[task.id] = {
      start: task.start,
      end: task.end,
      min: null,
    }
  }

  // Second pass, min/max adjusted based on deps
  for (let task of tasks) {
    for (let dep of task.dependencies) {
      // Calculate the new
      const depStart = dep.type === 'START'
        ? result[dep.taskId].start.plus({ days: dep.buffer ?? 0 })
        : result[dep.taskId].end.plus({ days: dep.buffer ?? 0 })

      result[task.id].min = depStart > result[task.id].min
        ? depStart
        : result[task.id].min
    }
  }

  return result
}

/**
 *
 * Dependency Naming:
 *   Task(Before Task) -> Dep(from: Before Task, to: After Task) -> Task(After Task)
 *   Node -> Edge -> Node
 *
 * TODO: Probably should detect and prevent cycles.
 *
 * @param {*} param0
 * @returns
 */
function loadData({ tasks, start, options }) {
  const tasksResult = {}
  const depsResult = []

  tasks.forEach((task, index) => {
    const dimensions = getBarDimensions({ index, task, start, options })

    tasksResult[task.id] = {
      ...task,
      index,
      minX: 0,
      drawKey: 0,
      originalDimensions: dimensions,
      dimensions,
      beforeTasks: [],
      afterTasks: [],
    }

    // First pass, initialize the dependencies
    task.dependencies.forEach(dep => {
      const { taskId: from, ...rest } = dep
      depsResult.push({ drawKey: 0, to: task.id, from, ...rest })
    })

    // Dependency second pass, calculate mix/max and attach before/after ids
    depsResult.forEach(dep => {
      tasksResult[dep.from].afterTasks.push(dep.to)
      tasksResult[dep.to].beforeTasks.push(dep.from)

      // Min
      const { dimensions: fromDimensions, minX: currentMinX } = tasksResult[dep.from]
      const { x: fromX, width: fromWidth } = fromDimensions

      const newMinX = dep.type === 'START'
        ? fromX + (dep.buffer || 0) * options.columnWidth
        : fromX + fromWidth + (dep.buffer || 0) * options.columnWidth

      tasksResult[dep.to].minX = Math.max(0, currentMinX, newMinX)
    })
  })

  console.log(tasksResult)

  return {
    tasks: tasksResult,
    dependencies: depsResult,
    drag: null,
  }
}


export function Gantt({
  tasks: tasksFromProps = [],
  mode = 'day',
  buffer = 360,
  onChanges,
  options: optionsFromProps = {},
}) {
  const containerRef = React.useRef(null)

  const { start, end, first } = React.useMemo(
    () => initializeStartAndEnd({ tasks: tasksFromProps, mode, buffer }),
    [],
  )

  const options = React.useMemo(
    () => initializeDrawOptions(optionsFromProps, mode),
    [],
  )

  const [state, setState] = React.useState({ tasks: {}, drag: null, dependencies: [] })
  React.useEffect(
    () => {
      setState(loadData({ tasks: tasksFromProps, start, options }))
    },
    [tasksFromProps, start, options]
  )

  // const [dependencies, setDependencies] = React.useState({})

  const todayX = React.useMemo(
    () => start
      ? first.startOf(mode).diff(start).as('days') * options.columnWidth
      : 0,
    [start, mode, options]
  )

  const startDrag = React.useCallback(
    (event, taskId, dragMode) => {
      event.preventDefault()
      event.stopPropagation()

      setState(s => ({
        ...s,
        drag: {
          taskId,
          mode: dragMode,
          initialX: event.clientX,
          x: event.clientX,
          initialScroll: containerRef.current?.scrollLeft ?? 0,
          updatedTasks: {},
        },
      }))
    },
    [containerRef],
  )

  function handleMouseMove(event) {
    if (!state.drag) {
      return
    }

    // Check if scroll should be triggered
    handleScroll(event, containerRef)

    setState(s => {
      const task = { ...s.tasks[s.drag.taskId] }
      task.drawKey += 1
      task.dimensions = applyDragPosition({
        minX: task.minX,
        dim: task.originalDimensions,
        drag: s.drag,
        options,
        containerRef,
      })

      const updatedTasks = { [task.id]: true }

      // If dragging, move any dependent (to) tasks out.
      const toTasks = s.drag.mode === 'bar'
        ? task.afterTasks.reduce((result, toTaskId) => {
          const toTask = { ...s.tasks[toTaskId] }

          toTask.drawKey += 1
          toTask.dimensions = applyDragPosition({
            minX: toTask.minX,
            dim: toTask.originalDimensions,
            drag: s.drag,
            options,
            containerRef,
          })

          updatedTasks[toTask.id] = true
          result[toTask.id] = toTask

          return result
        }, {})
        : {}

      return {
        ...s,
        tasks: {
          ...s.tasks,
          ...toTasks,
          [s.drag.taskId]: task,
        },
        drag: {
          ...s.drag,
          x: event.clientX,
          updatedTasks: {
            ...s.drag.updatedTasks,
            ...updatedTasks,
          }
        },
      }
    })
  }

  function handleMouseUp() {
    if (!state.drag) {
      return
    }

    setState(s => {
      const changes = Object.keys(s.drag.updatedTasks).map(taskId => {
        const task = s.tasks[taskId]

        const progress = state.drag.mode === 'progress'
          ? Math.max(
            0,
            Math.min(
              100,
              100 * safeDivide(task.dimensions.progress, task.dimensions.width),
            )
          )
          : task.progress

        const daysFromStart = Math.floor(task.dimensions.x / options.columnWidth)
        const taskDays = Math.floor(task.dimensions.width / options.columnWidth)
        const newStart = start.plus({ days: daysFromStart })
        const newEnd = start.plus({ days: daysFromStart + taskDays })

        return { id: task.id, index: task.index, start: newStart, end: newEnd, progress }
      })

      onChanges?.(changes)
      return { ...s, drag: null }
    })
  }

  // Update the drag callbacks
  React.useEffect(
    () => {
      if (state?.drag?.mode) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseup', handleMouseUp)
        }
      }
    },
    [state?.drag?.mode]
  )

  React.useLayoutEffect(
    () => {
      containerRef.current.scrollLeft = todayX
    },
    [containerRef, todayX]
  )

  return (
    <GanttContext.Provider
      value={{
        numTasks: tasksFromProps.length,
        start,
        end,
        ...state,
        // dependencies,
        mode,
        options,
        containerRef,
        startDrag,
      }}
    >
      <div className="GenjoGantt__container" ref={containerRef}>
        <GanttSvg>
          {state.dependencies.map(dep => (
            <GanttArrow
              key={`${dep.from}__${dep.to}`}
              dep={dep}
            />
          ))}

          {Object.values(state.tasks).map(task => (
            <GanttTask
              key={task.id}
              task={task}
            />
          ))}
        </GanttSvg>
      </div>

      {/*<ButtonGroup>
        <Button variant={mode === 'day' ? 'contained' : 'outlined'} onClick={() => dispatch({ type: 'SET_MODE', mode: 'day' })}>Daily</Button>
        <Button variant={mode === 'week' ? 'contained' : 'outlined'} onClick={() => dispatch({ type: 'SET_MODE', mode: 'week' })}>Weekly</Button>
        <Button variant={mode === 'month' ? 'contained' : 'outlined'} onClick={() => dispatch({ type: 'SET_MODE', mode: 'month' })}>Monthly</Button>
      </ButtonGroup>*/}
    </GanttContext.Provider>
  )
}

Gantt.propTypes = {
  mode: PropTypes.oneOf(['month', 'day', 'week']),
  tasks: PropTypes.arrayOf(PropTypes.object),
}
