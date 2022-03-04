import { DateTime } from 'luxon'

export function createMilestone({ index, milestone, task, start, options }) {
  const now = DateTime.now()

  const daysFromStart = milestone.date.diff(start).as('days')
  const x = options.columnWidth * (daysFromStart + 0.5)
  const y = task.dimensions.y + options.barHeight / 2

  const status = ['DONE', 'CANCELED', 'STUCK'].includes(milestone.status)
    ? milestone.status
    : now > milestone.date
    ? 'LATE'
    : now > milestone.date.minus({ days: options.upcomingDays })
    ? 'UPCOMING'
    : 'INCOMPLETE'

  return {
    id: milestone.id,
    index,
    drawKey: 0,
    date: milestone.date,
    label: milestone.label,
    taskId: task.id,
    status,
    dimensions: { x, y },
    originalDimensions: { x, y },
    minX: task.dimensions.x + options.columnWidth / 2,
    maxX: task.dimensions.x + task.dimensions.width - options.columnWidth / 2,
  }
}
