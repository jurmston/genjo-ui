import * as React from 'react'
import PropTypes from 'prop-types'

import { useGantt } from './useGantt'
import { GanttDependencyHandle } from './GanttDependencyHandle'
import linkIcon from './icons/link.svg'


export function GanttDepDragLine() {
  const { depDrag } = useGantt()

  if (!depDrag) {
    return null
  }

  return (
    <>
      <line
        x1={depDrag?.initialX}
        y1={depDrag?.initialY}
        x2={depDrag?.x}
        y2={depDrag?.y}
        style={{
          stroke: '#6366f1',
          strokeWidth: 2,
          strokeDasharray: '5 2',
        }}
      />

      <GanttDependencyHandle x={depDrag?.x} y={depDrag?.y} />
    </>
  )
}

GanttDepDragLine.propTypes = {

}
