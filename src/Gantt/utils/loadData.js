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
 export function loadData({ data, start, end, options }) {
  const tasksResult = {}
  const depsResult = []
  const milestonesResult = {}

  data.forEach((taskDatum, index) => {
    const task = createTask({ index, start, end, options, data: taskDatum })
    tasksResult[task.id] = task

    // First pass, initialize the dependencies
    taskDatum.dependencies.forEach(depTaskId => {
      depsResult.push({ drawKey: 0, to: task.id, from: depTaskId })
    })

    taskDatum?.milestones?.forEach((milestone, milestoneIndex) => {
      milestonesResult[milestone.id] = createMilestone({ milestone, index: milestoneIndex, task, start, options })
    })
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
