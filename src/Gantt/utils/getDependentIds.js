export function getDependentIds(tasks, currentTask) {
  const dependents = []

  for (let taskId of currentTask.afterTasks) {
    dependents.push(taskId)

    for (let nestedTaskId of getDependentIds(tasks, tasks[taskId])) {
      dependents.push(nestedTaskId)
    }
  }

  return [...new Set(dependents)]
}
