import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { useGantt } from './useGantt'
import {
  HANDLE_WIDTH,
  BAR_HEIGHT,
  HANDLE_BUFFER,
} from './utils/constants'


export function GanttResizeHandle({ task, position }) {
  const { startDrag, drag } = useGantt()

  const { x, y } = React.useMemo(
    () => ({
      x: task.dimensions.x + (
        position === 'end' ? task.dimensions.width - 6 : 0
      ),
      y: task.dimensions.y + 1,
    }),
    [task.dimensions, position, drag]
  )

  return (
    <rect
      onMouseDown={event => startDrag(event, task.id, position)}
      x={x}
      y={y}
      width={HANDLE_WIDTH}
      height={BAR_HEIGHT - HANDLE_BUFFER}
      rx={3}
      ry={3}
      className={clsx(
        "GenjoGantt__handle",
        position === 'end' && 'GenjoGantt__handle_end',
        Boolean(drag?.taskId === task.id) && 'GenjoGantt__handle_dragging',
      )}
      style={{
        fill: task.color,
      }}
    />
  )
}

GanttResizeHandle.propTypes = {

}
