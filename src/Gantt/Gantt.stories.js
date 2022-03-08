import React from 'react'
import { DateTime } from 'luxon'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import { colors } from '../ThemeProvider'

import { TarjanGraph } from './utils/tarjan'

import { Gantt } from './Gantt'

export default {
  title: 'Widgets/Gantt',
  component: Gantt,
}

import getRandomUsers from '../../.storybook/utils/getRandomUsers'

// Phase Statuses - NOT_STARTED, IN_PROGRESS, DONE
// Milestone Statuses - INCOMPLETE, STUCK, DONE, CANCELED
// -- derived statuses = LATE, UPCOMING


/* Data structure:
  projects = [
    {
      id: PROJECT_ID,
      name: PROJECT_NAME,
      number: PROJECT_NUMBER,
      progress: number,
      isExpanded: true,
      phases: [
        {
          id: PHASE_ID,
          name: PHASE_NAME,
          progress: number,
          isExpanded: true,
          milestones: [
            {
              id: MILESTONE_ID,
              date: DATE,
              label: MIESTONE_LABEL,
              status: MILESTONE_STATUS,
            }
          ]

        }
      ]

    }
  ]

*/


export const Primary = () => {
  const [selectedMilestone, setSelectedMilestone] = React.useState(null)
  const [selectedTask, setSelectedTask] = React.useState(null)

  const users = React.useMemo(
    () => {
      return getRandomUsers(20).reduce((result, user) => {
        if (user.id) {
          result[user.id] = user
        }

        return result
      }, {})
    },
    []
  )

  console.log({ users })

  const [tasks, setTasks] = React.useState([
    {
      id: 'project-1',
      label: 'Project 1',
      chip: '22045',
      start: DateTime.fromISO('2022-01-01'),
      end: DateTime.fromISO('2022-05-29'),
      progress: 33,
      type: 'PROJECT',
    },
    {
      id: 'phase-1',
      label: 'Redesign Website',
      start: DateTime.fromISO('2022-01-01'),
      end: DateTime.fromISO('2022-03-29'),
      progress: 33,
      status: 'ACTIVE',
      type: 'PHASE',
      project: 'project-1',
    },
    {
      id: 'task-2',
      label: 'Magic Things',
      status: 'NOT_STARTED',
      start: null,
      end: null,
      progress: 40,
      phase: 'phase-1',
    },
    {
      id: 'task-3',
      label: 'Stuff Hapeens',
      status: 'DONE',
      start: DateTime.fromISO('2022-03-25'),
      end: DateTime.fromISO('2022-03-25'),
      progress: 50,
      dependencies: ['task-2'],
      project: 'project-1',
      phase: 'phase-1',
    },
    {
      id: 'task-4',
      label: 'Final Review',
      status: 'STUCK',
      start: DateTime.fromISO('2022-03-27'),
      end: DateTime.fromISO('2022-03-28'),
      progress: 0,
      dependencies: ['task-3'],
      phase: 'phase-1',
      project: 'project-1',
      users: Object.keys(users).slice(0, 4),
    },
    {
      id: 'task-5',
      label: 'One More Thing',
      start: DateTime.fromISO('2022-03-31'),
      end: DateTime.fromISO('2022-04-25'),
      progress: 0,
      dependencies: ['task-2'],
      phase: 'phase-1',
      project: 'project-1',
    },
    {
      id: 'phase-2',
      label: 'Final Final Sprint',
      start: DateTime.fromISO('2022-04-05'),
      end: DateTime.fromISO('2022-04-10'),
      progress: 0,
      dependencies: ['task-5'],
      phase: 'phase-1',
      project: 'project-1',
    },
    {
      id: 'task-6',
      label: 'Final Final Sprint',
      start: DateTime.fromISO('2022-04-05'),
      end: DateTime.fromISO('2022-04-10'),
      progress: 0,
      dependencies: ['task-5'],
      phase: 'phase-2',
      project: 'project-1',
    },
    {
      id: 'project-2',
      label: 'Project 2',
      chip: '22067',
      start: DateTime.fromISO('2022-02-01'),
      end: DateTime.fromISO('2022-08-30'),
      progress: 33,
      status: 'ACTIVE',
      type: 'PROJECT',
    },
    {
      id: 'phase-8',
      label: 'Redesign Website',
      start: DateTime.fromISO('2022-01-01'),
      end: DateTime.fromISO('2022-05-29'),
      progress: 33,
      status: 'ACTIVE',
      type: 'PHASE',
      project: 'project-2',
    },
    {
      id: 'task-12',
      label: 'Magic Things',
      status: 'ON_HOLD',
      start: DateTime.fromISO('2022-02-10'),
      end: DateTime.fromISO('2022-02-17'),
      progress: 40,
      phase: 'phase-8',
      project: 'project-2',
    },
  ])

  const [milestones, setMilestones] = React.useState([
    { id: 'milestone-1', project: 'project-1', date: DateTime.fromISO('2022-02-10'), label: 'We agreed to start this thing', status: 'DONE' },
    { id: 'milestone-2', project: 'project-1', date: DateTime.fromISO('2022-02-20'), label: 'Call that guy with the money', status: 'DONE' },
    { id: 'milestone-3', project: 'project-1', date: DateTime.fromISO('2022-03-20'), label: 'Call that guy with the money', status: 'STUCK' },
    { id: 'milestone-4', project: 'project-1', date: DateTime.fromISO('2022-04-20'), label: 'Call that guy with the money', status: 'INCOMPLETE' },
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
      <Card variant="outlined" style={{ maxHeight: '90vh', overflowY: 'auto', }}>
        <Gantt
          users={users}
          title="My Projects (10)"
          rows={tasks}
          milestones={milestones}
          onChanges={handleChanges}
          mode="year"
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
