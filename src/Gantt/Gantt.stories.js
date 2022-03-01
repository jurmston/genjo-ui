import React from 'react'
import { DateTime } from 'luxon'
// import Grid from '@mui/material/Grid'

import { Gantt } from './Gantt'

export default {
  title: 'Widgets/Gantt',
  component: Gantt,
}

export const Primary = () => {
  const [tasks, setTasks] = React.useState([
    {
      id: 'task-1',
      label: 'Redesign Website',
      start: DateTime.fromISO('2022-02-02'),
      end: DateTime.fromISO('2022-02-24'),
      progress: 20,
      dependencies: [],
    },
    {
      id: 'task-2',
      label: 'Magic Things',
      start: DateTime.fromISO('2022-02-05'),
      end: DateTime.fromISO('2022-02-12'),
      progress: 10,
      dependencies: [
        { taskId: 'task-1', type: 'START', buffer: 0 }
      ],
    },
    {
      id: 'task-3',
      label: 'Stuff Hapeens',
      start: DateTime.fromISO('2022-03-05'),
      end: DateTime.fromISO('2022-03-25'),
      progress: 0,
      dependencies: [
        { taskId: 'task-1', type: 'FINISH', buffer: 2 }
      ],
    },
  ])

  function handleChanges(changes) {
    setTasks(
      s => {
        const newTasks = [ ...s ]
        changes.forEach(({ index, start, end, progress }) => {
          newTasks[index].start = start
          newTasks[index].end = end
          newTasks[index].progress = progress
        })

        return newTasks
      }
    )
  }

  return (
    <div>
      <Gantt
        tasks={tasks}
        onChanges={handleChanges}
        mode="month"
      />
    </div>

  )
}
