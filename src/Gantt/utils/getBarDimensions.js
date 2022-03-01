export function getBarDimensions({ index, start, task, options }) {
  const taskDays = task.end.diff(task.start).as('days')
  const daysFromStart = task.start.diff(start).as('days')

  const { columnWidth, headerHeight, padding, barHeight } = options

  const width = taskDays * columnWidth
  const x = daysFromStart * columnWidth
  const y = headerHeight + padding + index * (barHeight + padding)

  const progress = task.progress * width / 100

  return { width, x, y, progress }
}
