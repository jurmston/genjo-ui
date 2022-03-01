import { DateTime } from 'luxon'


export function initializeStartAndEnd({ tasks, mode = 'day', buffer = 360 }) {
  let start = DateTime.now()
  let end = DateTime.now()

  for (let task of tasks) {
    // Update the min/max start and end dates.
    start = task.start < start
      ? task.start
      : start

    end = task.end > end
      ? task.end
      : end
  }

  const startWithBuffer = start.minus({ days: buffer }).startOf(mode)

  const endWithBuffer = end.plus({ days: buffer }).endOf(mode)

  return {
    first: start,
    start: startWithBuffer,
    end: endWithBuffer,
  }
}