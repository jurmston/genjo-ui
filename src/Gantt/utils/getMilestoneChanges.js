export function getMilestoneChanges(state) {
  if (!state.drag) {
    return []
  }

  return state.drag.affectedMilestones.map(milestoneId => {
    const milestone = state.milestones[milestoneId]

    const daysFromStart = Math.round((milestone.dimensions.x - state.options.columnWidth / 2) / state.options.columnWidth)
    const newDate = state.start.plus({ days: daysFromStart })

    return {
      id: milestone.id,
      index: milestone.index,
      date: newDate,
      taskId: milestone.taskId,
      taskIndex: state.tasks[milestone.taskId].index,
    }
  })
}
