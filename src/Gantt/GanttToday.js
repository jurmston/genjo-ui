import * as React from 'react'
import PropTypes from 'prop-types'

import { useGantt } from './useGantt'
import { DateTime } from 'luxon'

export function GanttToday() {
  const { start, options, numTasks } = useGantt()

  const daysFromStart = DateTime.now().startOf('day').diff(start).as('days')

  const { headerHeight, rowHeight, columnWidth } = options

  const width = daysFromStart * columnWidth
  const height = numTasks * rowHeight

  return (
    <g>
      <rect
        x={0}
        y={headerHeight}
        width={width}
        height={height}
        style={{
          pointerEvents: 'none',
          fill: '#fff',
          opacity: 0.25,
        }}
      />

      <line
        x1={width}
        x2={width}
        y1={headerHeight}
        y2={headerHeight + height}
        style={{
          stroke: '#f97316',
          strokeWidth: 2,
        }}
      />
    </g>
  )
}

GanttToday.propTypes = {

}
