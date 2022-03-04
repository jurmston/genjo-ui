import React from 'react'
import { DateTime } from 'luxon'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import { Gantt } from './Gantt'

export default {
  title: 'Widgets/Gantt',
  component: Gantt,
}


// Phase Statuses - NOT_STARTED, IN_PROGRESS, DONE
// Milestone Statuses - INCOMPLETE, STUCK, DONE, CANCELED
// -- derived statuses = LATE, UPCOMING

export const Primary = () => {
  const [mode, setMode] = React.useState('month')

  const [selectedId, setSelectedId] = React.useState(null)

  const [tasks, setTasks] = React.useState([
    {
      id: 'task-1',
      label: 'Redesign Website',
      start: null,
      end: null,
      progress: 100,
      dependencies: [],
      status: 'DONE',
      milestones: [
        { id: 'milestone-1', date: DateTime.fromISO('2022-02-10'), label: 'Do it', status: 'DONE' },
        { id: 'milestone-2', date: DateTime.fromISO('2022-02-20'), label: 'We did it', status: 'DONE' },
      ]
    },
    {
      id: 'task-2',
      label: 'Magic Things',
      status: 'DONE',
      start: DateTime.fromISO('2022-02-10'),
      end: null,
      progress: 100,
      dependencies: ['task-1'],
    },
    {
      id: 'task-3',
      label: 'Stuff Hapeens',
      status: 'ACTIVE',
      start: null,
      end: DateTime.fromISO('2022-03-25'),
      progress: 50,
      dependencies: ['task-1'],
      milestones: [
        { id: 'milestone-3', date: DateTime.fromISO('2022-03-05'), label: 'Do it', status: 'INCOMPLETE' },
      ]
    },
    {
      id: 'task-4',
      label: 'Final Review',
      start: DateTime.fromISO('2022-03-27'),
      end: DateTime.fromISO('2022-03-28'),
      progress: 0,
      dependencies: ['task-3'],
    },
    {
      id: 'task-5',
      label: 'One More Thing',
      start: DateTime.fromISO('2022-03-31'),
      end: DateTime.fromISO('2022-04-05'),
      progress: 0,
      dependencies: ['task-1'],
    },
    {
      id: 'task-6',
      label: 'Final Final Sprint',
      start: DateTime.fromISO('2022-04-05'),
      end: DateTime.fromISO('2022-04-10'),
      progress: 0,
      dependencies: ['task-5'],
    },
  ])

  function handleChanges(mode, taskChanges = [], milestoneChanges = []) {
    setTasks(
      s => {
        const newTasks = [ ...s ]

        taskChanges.forEach(({ index, start, end, progress }) => {
          newTasks[index].start = start
          newTasks[index].end = end
          newTasks[index].progress = progress
        })

        milestoneChanges.forEach(({ index, taskIndex, date }) => {
          newTasks[taskIndex].milestones[index].date = date
        })

        return newTasks
      }
    )
  }

  return (
    <div>
      <Card variant="outlined">
        <Gantt
          title="My Projects (10)"
          tasks={tasks}
          onChanges={handleChanges}
          mode={mode}
          selectedId={selectedId}
          onTaskClick={(event, taskId) => setSelectedId(s => s === taskId ? null : taskId)}
          onMilestoneClick={(event, milestoneId) => setSelectedId(s => s === milestoneId ? null : milestoneId)}
        />
      </Card>

    </div>

  )
}
