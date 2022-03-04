import { DateTime } from 'luxon'


export function initializeStartAndEnd({ data, mode = 'day', options }) {
  let start = DateTime.now()
  let end = DateTime.now()

  for (let task of data) {
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

  const startWithBuffer = start.minus({ days: options.bufferDays }).startOf(mode)

  const endWithBuffer = end.plus({ days: options.bufferDays }).endOf(mode)

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