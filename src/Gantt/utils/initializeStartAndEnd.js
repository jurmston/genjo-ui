import { DateTime } from 'luxon'


export function initializeStartAndEnd({ rowData, milestoneData, mode = 'day', options }) {
  let start = DateTime.now()
  let end = DateTime.now()

  for (let task of rowData) {
    // Update the min/max start and end dates.
    if (task.start) {
      start = task.start < start
        ? task.start
        : start
    }

    if (task.end) {
      end = task.end > end
        ? task.end
        : end
    }
  }

  for (let milestone of milestoneData) {
    // Update the min/max start and end dates.
    if (milestone.date) {
      start = milestone.date < start
        ? milestone.date
        : start

      end = milestone.date > end
        ? milestone.date
        : end
    }
  }

  const startWithBuffer = start.minus({ days: options.bufferDays }).startOf('week')

  const endWithBuffer = end.plus({ days: options.bufferDays }).endOf('week')

  const numDays = endWithBuffer.endOf('day').diff(startWithBuffer.startOf('day')).as('days')

  const width = options.columnWidth * numDays

  return {
    first: start,
    start: startWithBuffer,
    end: endWithBuffer,
    width,
    numDays,
  }
}