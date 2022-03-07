import React from 'react'
import { DateTime } from 'luxon'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import { TarjanGraph } from './utils/tarjan'

import { Gantt } from './Gantt'

export default {
  title: 'Widgets/Gantt',
  component: Gantt,
}


function detectCycles(data) {

}


// Phase Statuses - NOT_STARTED, IN_PROGRESS, DONE
// Milestone Statuses - INCOMPLETE, STUCK, DONE, CANCELED
// -- derived statuses = LATE, UPCOMING

export const Primary = () => {
  const [selectedMilestone, setSelectedMilestone] = React.useState(null)
  const [selectedTask, setSelectedTask] = React.useState(null)

  const [tasks, setTasks] = React.useState([
    {
      id: 'phase-1',
      label: 'Redesign Website',
      start: null,
      end: DateTime.fromISO('2022-05-29'),
      progress: 33,
      dependencies: [],
      status: 'ACTIVE',
      type: 'PHASE',
      milestones: [
        { id: 'milestone-1', date: DateTime.fromISO('2022-02-10'), label: 'We agreed to start this thing', status: 'DONE' },
        { id: 'milestone-2', date: DateTime.fromISO('2022-02-20'), label: 'Call that guy with the money', status: 'DONE' },
        { id: 'milestone-3', date: DateTime.fromISO('2022-03-20'), label: 'Call that guy with the money', status: 'STUCK' },
        { id: 'milestone-4', date: DateTime.fromISO('2022-04-20'), label: 'Call that guy with the money', status: 'INCOMPLETE' },
      ]
    },
    {
      id: 'task-2',
      label: 'Magic Things',
      status: 'ACTIVE',
      start: DateTime.fromISO('2022-02-10'),
      end: null,
      progress: 40,
      dependencies: ['phase-1'],
    },
    {
      id: 'task-3',
      label: 'Stuff Hapeens',
      status: 'ACTIVE',
      start: null,
      end: DateTime.fromISO('2022-03-25'),
      progress: 50,
      dependencies: ['phase-1'],
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
      end: DateTime.fromISO('2022-04-25'),
      progress: 0,
      dependencies: ['phase-1'],
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

  function onAddDependency(fromId, toId) {
    // No self-dependencies!
    if (fromId === toId) {
      return
    }

    setTasks(s => {
      const newTasks = s.map(task => {
        if (task.id !== toId) {
          return task
        }

        const toTask = { ...task }

        console.log(task.id)

        if (!toTask?.dependencies?.includes(fromId)) {
          toTask.dependencies = (toTask.dependencies || []).concat([fromId])
        }

        return toTask
      })

      const g = new TarjanGraph(newTasks)
      g.getStrongComponents()

      if (g.cycleDetected) {
        console.log('Cycle!')
        return s
      }

      return newTasks
    })
  }

  React.useEffect(
    () => {
      const g = new TarjanGraph(tasks)
      g.getStrongComponents()

      console.log(g)
    },
    [tasks]
  )

  return (
    <div>
      <Card variant="outlined">
        <Gantt
          title="My Projects (10)"
          tasks={tasks}
          onChanges={handleChanges}
          mode="month"
          selectedId={selectedTask || selectedMilestone}
          onTaskClick={(event, taskId) => {
            setSelectedTask(s => s === taskId ? null : taskId)
            setSelectedMilestone(null)
          }}
          onMilestoneClick={(event, milestoneId) => {
            setSelectedMilestone(s => s === milestoneId ? null : milestoneId)
            setSelectedTask(null)
          }}
          onAddDependency={onAddDependency}
        />
      </Card>

      {Boolean(selectedTask) && (
        <div>
          {`You are viewing: ${
            tasks.find(task => task.id === selectedTask)?.label
          }`}
        </div>
      )}

      {Boolean(selectedMilestone) && (
        <div>
          {`You are viewing: ${
            tasks.find(task => task?.milestones?.find?.(ms => ms.id === selectedMilestone))?.milestones?.find?.(ms => ms.id === selectedMilestone)?.label
          }`}
        </div>
      )}
    </div>

  )
}
