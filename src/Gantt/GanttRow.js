import * as React from 'react'
import PropTypes from 'prop-types'
import { useGantt} from './useGantt'

export function GanttRow({ index, width }) {
  const { options } = useGantt()
  const { headerHeight, padding, barHeight } = options

  const rowY = headerHeight + (padding / 2) + index * (barHeight + padding)

  return (
    <rect
      x={0}
      y={rowY}
      width={width}
      height={barHeight + padding}
      className="GenjoGantt__grid__row"
    />
  )
}

GanttRow.propTypes = {

}
