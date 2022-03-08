import { createTask } from './createTask'
import { createMilestone } from './createMilestone'


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
 export function loadData({ rowData, milestoneData, start, end, options }) {
  const tasksResult = {}
  const depsResult = []
  const milestonesResult = {}

  rowData.forEach((row, index) => {
    const task = createTask({ index, start, end, options, row })
    tasksResult[task.id] = task

    // First pass, initialize the dependencies
    row?.dependencies?.forEach(depTaskId => {
      depsResult.push({ drawKey: 0, to: task.id, from: depTaskId })
    })
  })

  milestoneData.forEach((milestone, milestoneIndex) => {
    const milestoneTask = tasksResult[milestone.project]

    if (milestoneTask) {
      milestonesResult[milestone.id] = createMilestone({
        milestone,
        index: milestoneIndex,
        start,
        options,
        task: milestoneTask,
      })
    }
  })

  // Dependency second pass, calculate mix/max and attach before/after ids
  depsResult.forEach(dep => {
    tasksResult[dep.from].afterTasks.push(dep.to)
    tasksResult[dep.to].beforeTasks.push(dep.from)

    // Min
    const { dimensions: fromDimensions, minX: currentMinX } = tasksResult[dep.from]
    const { x: fromX } = fromDimensions
    const newMinX = fromX

    tasksResult[dep.to].minX = Math.max(0, currentMinX, newMinX)
  })

  return {
    tasks: tasksResult,
    dependencies: depsResult,
    milestones: milestonesResult,
    drag: null,
  }
}
