import React from 'react'

// import Grid from '@material-ui/core/Grid'

import { Gantt } from './Gantt'

export default {
  title: 'Widgets/Gantt',
  component: Gantt,
}

export const Primary = () => {
  return (
    <div>
      <Gantt
        tasks={[
          {
            id: 'task-1',
            label: 'Redesign Website',
            start: '2021-10-02',
            end: '2021-10-24',
            progress: 20,
            dependencies: [],
          },
          {
            id: 'task-2',
            label: 'Magic Things',
            start: '2021-10-05',
            end: '2021-10-12',
            progress: 10,
            dependencies: [
              { taskId: 'task-1', type: 'START', buffer: 0 }
            ],
          },
          {
            id: 'task-3',
            label: 'Stuff Hapeens',
            start: '2021-10-30',
            end: '2021-11-08',
            progress: 0,
            dependencies: [
              { taskId: 'task-1', type: 'FINISH', buffer: 5 }
            ],
          },
        ]}
      />
    </div>

  )
}
