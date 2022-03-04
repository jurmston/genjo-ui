import * as React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { useGantt } from './useGantt'
import { colors } from '../ThemeProvider'

const PADDING_Y = 4
const PADDING_X = 16
const POINTER_WIDTH = 5
const POINTER_HEIGHT = 6
const POINTER_START = 32


export function GanttDragDate() {

  const textRef = React.useRef(null)

  const { drag, options, start, tasks, milestones } = useGantt()

  const [textDim, setTextDim] = React.useState({ height: 0, width: 0 })

  const numDays = drag.date.endOf('day').diff(start.startOf('day')).as('days')
  const item = tasks[drag.draggableId] || milestones[drag.draggableId]
  const x = drag.mode === 'progress'
    ? item.dimensions.x + item.dimensions.progressWidth - POINTER_START - POINTER_WIDTH
    : numDays * options.columnWidth - POINTER_START - POINTER_WIDTH

  const y = item.dimensions.y
    - textDim.height
    - 3 * PADDING_Y
    - POINTER_HEIGHT
    - (drag.mode === 'milestone' ? options.barHeight / 2 : 0)

  const borderRadius = (textDim.height + 2 * PADDING_Y) / 2

  React.useLayoutEffect(
    () => {
      const { height, width } = textRef.current?.getBBox?.() ?? { height: 0, width: 0 }
      setTextDim({ height, width })
    },
    [textRef, drag]
  )

  const pointerPoints = React.useMemo(() => [
    x + POINTER_START - POINTER_WIDTH + 1,
    y + textDim.height + 2 * PADDING_Y,
    x + POINTER_START + POINTER_WIDTH + 1,
    y + textDim.height + 2 * PADDING_Y,
    x + POINTER_START + 1,
    y + textDim.height + 2 * PADDING_Y + POINTER_HEIGHT,
  ].join(','), [x, y, textDim, drag])

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={borderRadius}
        ry={borderRadius}
        height={textDim.height + 2 * PADDING_Y}
        width={textDim.width + 2 * PADDING_X}
        style={{
          fill: colors.stone[600],
          filter: 'drop-shadow(1px 1px 1px rgb(0 0 0 / 0.25))',
        }}
      />

      <polygon
        points={pointerPoints}
        style={{ fill: colors.stone[600] }}
      />

      <text
        ref={textRef}
        x={x + PADDING_X}
        y={y + PADDING_Y + textDim.height / 2}
        style={{
          textAnchor: 'start',
          fontSize: 16,
          fontWeight: 700,
          fill: '#fff',
          dominantBaseline: 'central',
        }}
      >

        {drag.mode === 'progress'
          ? `${Math.round(100 * item.dimensions.progressWidth / item.dimensions.width)}%`
          : drag.date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
        }
      </text>
    </>
  )
}

GanttDragDate.propTypes = {

}
