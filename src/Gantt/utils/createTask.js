export function createTask({ index, start, end, data, options }) {
  const taskDays = (data.end || end).diff(data.start || start).as('days')
  const daysFromStart = (data.start || start).diff(start).as('days') + 1

  const { columnWidth, headerHeight, rowHeight, barPadding } = options

  const width = taskDays * columnWidth
  const x = daysFromStart * columnWidth
  const y = headerHeight + index * rowHeight + barPadding

  const progressWidth = data.progress * width / 100

  function milestonesMinReducer(currentMin, milestone) {
    const daysFromStart = milestone.date.diff(start).as('days')
    const milestoneX = options.columnWidth * daysFromStart
    return Math.min(milestoneX, currentMin)
  }

  function milestonesMaxReducer(currentMax, milestone) {
    const daysFromStart = milestone.date.diff(start).as('days') + 1
    const milestoneX = options.columnWidth * daysFromStart
    return Math.max(milestoneX, currentMax)
  }

  const milestones = data?.milestones ?? []

  return {
    id: data.id,
    label: data.label,
    start: data.start || start,
    end: data.end || end,
    hasStart: Boolean(data.start),
    hasEnd: Boolean(data.end),
    color: data.color || '#6366f1',
    status: data.status || 'NOT_STARTED',
    index,
    minX: 0,
    progress: data.progress,
    minMilestoneX: milestones.reduce(milestonesMinReducer, Infinity),
    maxMilestoneX: milestones.reduce(milestonesMaxReducer, 0),
    drawKey: 0,
    dimensions: { width, x, y, progressWidth },
    originalDimensions: { width, x, y, progressWidth },
    beforeTasks: [],
    afterTasks: [],
    milestones: milestones.map(milestone => milestone.id),
  }
}
