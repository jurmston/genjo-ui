import * as React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { GanttContext } from './GanttContext'
import { GanttSvg } from './GanttSvg'
import { GanttTask } from './GanttTask'
import { GanttArrow } from './GanttArrow'
import { GanttToday } from './GanttToday'
import { GanttDragDate } from './GanttDragDate'
import { GanttMilestone } from './GanttMilestone'
import {
  initializeStartAndEnd,
  initializeDrawOptions,
  handleScroll,
  dragTask,
  loadData,
  dragMilestone,
  getDependentIds,
  getTaskChanges,
  getMilestoneChanges,
} from './utils'


function initializeState({ data, mode, options }) {
  const initializedOptions = initializeDrawOptions({
    options,
    mode,
  })

  const { start, end, first, width, numDays } = initializeStartAndEnd({
    data,
    mode,
    options: initializedOptions,
  })

  const { tasks, dependencies, milestones } = loadData({
    data,
    start,
    end,
    options: initializedOptions,
  })

  return {
    numTasks: Object.keys(tasks).length,
    options: initializedOptions,
    mode,
    start,
    end,
    first,
    tasks,
    dependencies,
    milestones,
    drag: null,
    width,
    numDays,
    changes: null,
  }
}


function reducer(state, action) {
  switch (action.type) {

    case 'RELOAD_DATA': {
      const { tasks, dependencies, milestones } = loadData({
        data: action.data,
        start: state.start,
        end: state.end,
        options: state.options,
      })

      return {
        ...state,
        changes: null,
        tasks,
        dependencies,
        milestones,
      }
    }

    case 'CHANGE_MODE': {
      return initializeState({
        data: action.data,
        mode: action.mode,
        options: action.options,
      })
    }

    case 'START_DRAG': {

      const { event, dragMode, draggableId, containerRef } = action

      const affectedTasks = dragMode === 'milestone'
        ? []
        : dragMode === 'bar'
        ? [draggableId, ...getDependentIds(state.tasks, state.tasks[draggableId])]
        : [draggableId]

      const affectedMilestones = dragMode === 'milestone'
        ? [draggableId]
        : dragMode === 'bar'
        ? affectedTasks.map(taskId => state.tasks[taskId].milestones).flat()
        : []

      const mainTask = state.tasks[draggableId]

      // Tracking date so the user can quickly tell where the drag cursor is.
      let date = dragMode === 'milestone'
        ? state.milestones[draggableId].date
        : dragMode === 'end'
        ? mainTask.end
        : mainTask.start

      let initialX = event.clientX
      let currentDragMode = dragMode

      const updatedTasks = {}

      if (dragMode === 'bar' && mainTask && (!mainTask.hasStart || !mainTask.hasEnd)) {
        const dim = event.target.getBoundingClientRect()
        const clickX = event.clientX - dim.left

        const originalX = mainTask.originalDimensions.x
        const originalWidth = mainTask.originalDimensions.width

        const minX = Math.max(mainTask.minX, mainTask.minMilestoneX)
        const maxX = mainTask.maxMilestoneX

        if (!mainTask.hasStart && !mainTask.hasEnd) {  // Neither start or end
          // Create a new start either at the click or the required minX
          const newX = minX ? Math.min(minX, clickX) : clickX

          const newWidth = Math.max(
            state.options.columnWidth,
            clickX - newX,
            maxX ? maxX - newX : 0,
          )

          mainTask.originalDimensions.width = newWidth
          mainTask.originalDimensions.x = newX
          mainTask.dimensions.width = newWidth
          mainTask.dimensions.x = newX

          initialX = newX + dim.left
          currentDragMode = 'end'
        } else if (!mainTask.hasStart) {  // No start
          // Create a new start either at the click or the required minX
          const newX = minX ? Math.min(minX, clickX) : clickX

          const newWidth = Math.max(
            state.options.columnWidth,
            originalWidth - newX,
          )

          mainTask.originalDimensions.width = newWidth
          mainTask.originalDimensions.x = newX
          mainTask.dimensions.width = newWidth
          mainTask.dimensions.x = newX

          // The cursor should think it started at the new start.
          initialX = newX + dim.left
          currentDragMode = 'start'
        } else {  // No end
          // Create a new start either at the click or the required maxX
          const newWidth = Math.max(
            state.options.columnWidth,
            clickX,
            maxX < Infinity ? maxX - originalX : 0,
          )

          console.log(clickX, originalX + newWidth + dim.left)

          mainTask.originalDimensions.width = newWidth
          mainTask.originalDimensions.x = originalX
          mainTask.dimensions.width = newWidth
          mainTask.dimensions.x = originalX

          // The cursor should start from the new end
          // initialX = originalX + newWidth + dim.left
          currentDragMode = 'end'
        }

        updatedTasks[draggableId] = mainTask
      }

      // If the drag date is at the start, adjust by a day
      if (currentDragMode !== 'end' && currentDragMode !== 'milestone') {
        date = date.plus({ days: 1 })
      }

      return {
        ...state,
        tasks: { ...state.tasks, ...updatedTasks },
        drag: {
          wasDragged: false,
          draggableId,
          mode: currentDragMode,
          initialX,
          x: event.clientX,
          date,
          initialScroll: containerRef.current?.scrollLeft ?? 0,
          affectedTasks,
          affectedMilestones,
        },
      }
    }

    case 'DRAG_MOVE': {
      const { event, containerRef } = action

      const drag = { ...state.drag, x: event.clientX }

      const item = state.tasks[drag.draggableId] || state.milestones[drag.draggableId]

      if (item) {
        // Calculate the drag date
        const dateX = item.dimensions.x + (drag.mode === 'end' ? item.dimensions.width : 0)
        const newDate = state.start.plus({
          days: dateX / state.options.columnWidth + ((drag.mode === 'end' || drag.mode === 'milestone') ? 0 : 1)
        })
        drag.date = newDate
      }

      const updatedTasks = {}
      const updatedMilestones = {}

      drag?.affectedTasks?.forEach(taskId => {
        const task = { ...state.tasks[taskId] }

        dragTask({
          task,
          drag,
          options: state.options,
          containerRef,
        })

        updatedTasks[taskId] = task
      })

      drag?.affectedMilestones?.forEach(milestoneId => {
        const milestone = { ...state.milestones[milestoneId] }

        dragMilestone({
          task: updatedTasks[milestone.taskId] || state.tasks[milestone.taskId],
          milestone,
          drag,
          options: state.options,
          containerRef,
        })

        updatedMilestones[milestoneId] = milestone
      })

      drag.wasDragged = true

      return {
        ...state,
        drag,
        tasks: { ...state.tasks, ...updatedTasks },
        milestones: { ...state.milestones, ...updatedMilestones },
      }
    }

    case 'END_DRAG': {
      const changes = state.drag.wasDragged
        ? [state.drag.mode, getTaskChanges(state), getMilestoneChanges(state)]
        : null

      return { ...state, changes, drag: null }
    }

    default: {
      throw new Error(`Invalid action type: ${action.type}`)
    }
  }
}




export function Gantt({
  tasks: dataFromProps = [],
  mode: modeFromProps = 'month',
  title = '',
  onChanges,
  options: optionsFromProps = {},
  onTaskClick,
  onMilestoneClick,
  selectedId = null,
  actions,
}) {
  const containerRef = React.useRef(null)

  const [state, dispatch] = React.useReducer(
    reducer,
    initializeState({
      data: dataFromProps,
      mode: modeFromProps,
      options: optionsFromProps,
    }),
  )

  const [containerDim, setContainerDim] = React.useState({ start: 0, end: 0 })
  React.useLayoutEffect(
    () => {
      if (!containerRef.current) {
        return
      }

      setContainerDim({
        start: containerRef.current.scrollLeft,
        end: containerRef.current.scrollLeft + containerRef.current.clientWidth,
      })
    },
    [containerRef.current]
  )

  React.useEffect(
    () => {
      dispatch({ type: 'RELOAD_DATA', data: dataFromProps })
    },
    [dataFromProps]
  )

  const todayX = React.useMemo(
    () => state.start
      ? state.first.startOf(state.mode).diff(state.start).as('days') * state.options.columnWidth
      : 0,
    [state.start, state.mode, state.options]
  )

  const startDrag = React.useCallback(
    (event, draggableId, dragMode) => {
      event.preventDefault()
      event.stopPropagation()

      dispatch({
        type: 'START_DRAG',
        event,
        draggableId,
        dragMode,
        containerRef,
      })
    },
    [containerRef],
  )

  const handleTaskClick = React.useCallback(
    (event, taskId) => {
      event.preventDefault()
      event.stopPropagation()

      onTaskClick?.(event, taskId)
    }
  )

  const handleMilstoneClick = React.useCallback(
    (event, milestoneId) => {
      event.preventDefault()
      event.stopPropagation()

      onMilestoneClick?.(event, milestoneId)
    }
  )

  function handleMouseMove(event) {
    if (!state.drag) {
      return
    }

    // Check if scroll should be triggered
    handleScroll(event, containerRef)

    dispatch({
      type: 'DRAG_MOVE',
      event,
      containerRef,
    })
  }

  const handleMouseUp = React.useCallback(
    () => {
      if (!state.drag) {
        return
      }

      dispatch({ type: 'END_DRAG' })
    },
    [state.drag]
  )

  React.useEffect(
    () => {
      if (state.changes) {
        console.log('Changes updating', state.changes)
        onChanges?.(...state.changes)
      }
    },
    [state.changes]
  )

  function changeMode(newMode) {
    dispatch({ type: 'CHANGE_MODE', data: dataFromProps, mode: newMode, options: optionsFromProps })
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
        ...state,
        selectedId,
        containerRef,
        startDrag,
        handleTaskClick,
        handleMilstoneClick,
        todayX,
        containerDim,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
        <Typography variant="h3">{title}</Typography>

        {actions}

        <div style={{ flex: 1 }} />

        <ButtonGroup>
          <Button variant={state.mode === 'day' ? 'contained' : 'outlined'} onClick={() => changeMode('day')}>Daily</Button>
          <Button variant={state.mode === 'week' ? 'contained' : 'outlined'} onClick={() => changeMode('week')}>Weekly</Button>
          <Button variant={state.mode === 'month' ? 'contained' : 'outlined'} onClick={() => changeMode('month')}>Monthly</Button>
          <Button variant={state.mode === 'quarter' ? 'contained' : 'outlined'} onClick={() => changeMode('quarter')}>Quarterly</Button>
        </ButtonGroup>
      </Stack>

      <div style={{ position: 'relative' }}>
        <div
          className="GenjoGantt__container"
          ref={containerRef}
        >
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

            {Object.values(state.milestones).map(milestone => (
              <GanttMilestone
                key={milestone.id}
                milestone={milestone}
              />
            ))}

            <GanttToday />

            {Boolean(state.drag) && <GanttDragDate />}

          </GanttSvg>
        </div>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Object.values(state.tasks).map((task, index) => [
            !task.hasStart && (
              <div
                key={`no-start-${task.id}`}
                style={{
                  height: state.options.barHeight + 4,
                  width: 30,
                  position: 'absolute',
                  left: 0,
                  top: task.dimensions.y - 2,
                  background: 'linear-gradient(90deg, rgba(255,255,255,1) 3%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%)',
                }}
              />
            ),
            !task.hasEnd && (
              <div
                key={`no-end-${task.id}`}
                style={{
                  height: state.options.barHeight,
                  width: 30,
                  position: 'absolute',
                  right: 0,
                  top: task.dimensions.y,
                  background: 'linear-gradient(270deg, rgba(255,255,255,1) 3%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%)',
                }}
              />
            ),
          ])}
        </div>
      </div>
    </GanttContext.Provider>
  )
}

Gantt.propTypes = {
  mode: PropTypes.oneOf(['month', 'day', 'week']),
  tasks: PropTypes.arrayOf(PropTypes.object),
}
