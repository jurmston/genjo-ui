import * as React from 'react'
import PropTypes from 'prop-types'

import { useGantt } from './useGantt'

import checkIcon from './icons/check.svg'
import milestoneIcon from './icons/milestone.svg'
import upcomingIcon from './icons/upcoming.svg'
import stuckIcon from './icons/stuck.svg'
import lateIcon from './icons/late.svg'
import canceledIcon from './icons/canceled.svg'

const colorFilters = {
  active: 'invert(40%) sepia(84%) saturate(3725%) hue-rotate(226deg) brightness(101%) contrast(89%)',
  default: 'invert(94%) sepia(0%) saturate(1946%) hue-rotate(156deg) brightness(85%) contrast(101%)',
  warning: 'invert(52%) sepia(91%) saturate(754%) hue-rotate(2deg) brightness(107%) contrast(92%)',
  success: 'invert(57%) sepia(93%) saturate(397%) hue-rotate(90deg) brightness(91%) contrast(89%)',
  error: 'invert(25%) sepia(51%) saturate(3702%) hue-rotate(346deg) brightness(90%) contrast(94%)',
  canceled: 'invert(15%) sepia(65%) saturate(3482%) hue-rotate(283deg) brightness(98%) contrast(100%)',
}

const statusMap = {
  INCOMPLETE: [milestoneIcon, colorFilters.default],
  STUCK: [stuckIcon, colorFilters.error],
  DONE: [checkIcon, colorFilters.success],
  CANCELED: [canceledIcon, colorFilters.canceled],
  LATE: [lateIcon, colorFilters.error],
  UPCOMING: [upcomingIcon, colorFilters.warning],
}


function GanttMilestoneInner({ milestone }) {
  const { tasks, drag, options, start, startDrag, selectedId, handleMilstoneClick } = useGantt()
  const { barHeight } = options
  const { dimensions } = milestone
  const { x, y } = dimensions

  const iconSize = options.barHeight * 0.75

  const [icon, color] = React.useMemo(
    () => statusMap[milestone.status],
    [milestone.status]
  )

  const task = tasks[milestone.taskId]
  const isSelected = selectedId === milestone.id

  const taskIsDone = task.status === 'DONE'
  const isDone = milestone.status === 'DONE'

  const dragIntervalRef = React.useRef(null)

  function handleMouseDown(event) {
    if (taskIsDone || isDone) {
      return
    }

    clearInterval(dragIntervalRef.current)

    dragIntervalRef.current = setTimeout(
      () => {
        startDrag(event, milestone.id, 'milestone')
      },
      300,
    )
  }

  function handleMouseUp(event) {
    if (drag) {
      return
    }

    clearInterval(dragIntervalRef.current)
    handleMilstoneClick(event, milestone.id)
  }

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {isSelected && (
        <circle
          cx={x}
          cy={y}
          r={(barHeight - 2 ) / 2 + 3}
          style={{
            strokeWidth: 2,
            stroke: '#fed7aa',
            fill: 'transparent',
          }}
        />
      )}

      <circle
        cx={x}
        cy={y}
        r={(barHeight - 2) / 2}
        style={{
          fill: '#fff',
          // strokeWidth: 2,
          // stroke: task.color,
          filter: 'drop-shadow(1px 1px 1px rgb(0 0 0 / 0.25))',
        }}
      />

      <image
        href={icon}
        x={x - iconSize / 2}
        y={y - iconSize / 2}
        height={iconSize}
        width={iconSize}
        style={{
          filter: color,
        }}
      />
    </g>
  )
}

function milestonePropsAreEqual(prevProps, nextProps) {
  return Boolean(nextProps.milestone.drawKey)
    && prevProps.milestone.drawKey === nextProps.milestone.drawKey
}

export const GanttMilestone = React.memo(GanttMilestoneInner, milestonePropsAreEqual)
