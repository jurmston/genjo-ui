export function createTask({
  index,
  start,
  end,
  row,
  options,
}) {
  const taskStart = row.start ? row.start.startOf('week') : start
  const taskEnd = row.end ? row.end.endOf('week') : end

  const taskDays = taskEnd.diff(taskStart).as('days')
  const daysFromStart = taskStart.diff(start).as('days')

  const { columnWidth, headerHeight, rowHeight, barPadding } = options

  const width = taskDays * columnWidth
  const x = daysFromStart * columnWidth
  const y = headerHeight + index * rowHeight + barPadding

  const progressWidth = row.progress * width / 100

  const milestones = row?.milestones ?? []
  const users = row?.users ?? []

  return {
    id: row.id,
    type: row.type || 'TASK',
    label: row.label,
    start: taskStart,
    end: taskEnd,
    project: row.project || null,
    phase: row.phase || null,
    hasStart: Boolean(row.start),
    hasEnd: Boolean(row.end),
    color: row.color || '#6366f1',
    status: row.status || 'NOT_STARTED',
    index,
    minX: 0,
    chip: row?.chip || '',
    progress: row.progress,
    minMilestoneX: Infinity,
    maxMilestoneX: 0,
    drawKey: 0,
    dimensions: { width, x, y, progressWidth },
    originalDimensions: { width, x, y, progressWidth },
    beforeTasks: [],
    afterTasks: [],
    milestones: milestones.map(milestone => milestone.id),
    users,
  }
}
