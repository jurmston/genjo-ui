import { minMax, safeDivide } from '../../utils/math'


export function getTaskChanges(state) {
  if (!state.drag) {
    return []
  }

  return state.drag.affectedTasks.map(taskId => {
    const task = state.tasks[taskId]

    const progress = Math.round(minMax(
      0,
      100 * safeDivide(task.dimensions.progressWidth, task.dimensions.width),
      100,
    ))

    const daysFromStart = Math.round(task.dimensions.x / state.options.columnWidth) - 1
    const taskDays = Math.round(task.dimensions.width / state.options.columnWidth)
    const newStart = state.start.plus({ days: daysFromStart })
    const newEnd = state.start.plus({ days: daysFromStart + taskDays })

    return {
      id: task.id,
      index: task.index,
      start: state.drag.mode === 'end' && !task.hasStart ? null : newStart,
      end: state.drag.mode === 'start' && !task.hasEnd ? null : newEnd,
      progress: state.drag.mode === 'progress' ? progress : task.progress,
    }
  })
}
