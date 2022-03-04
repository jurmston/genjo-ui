import * as React from 'react'
import PropTypes from 'prop-types'
import { useGantt} from './useGantt'

export function GanttRow({ index, width }) {
  const { options } = useGantt()
  const { headerHeight, rowHeight } = options

  const rowY = headerHeight + index * rowHeight

  return (
    <rect
      x={0}
      y={rowY}
      width={width}
      height={rowHeight}
      className="GenjoGantt__grid__row"
    />
  )
}

GanttRow.propTypes = {

}
