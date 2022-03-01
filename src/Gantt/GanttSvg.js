import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { GanttRow } from './GanttRow'
import { useGantt } from './useGantt'


export function GanttSvg({ children }) {
  const { numTasks, options, start, end, mode } = useGantt()

  const { padding, barHeight, headerHeight, columnWidth, buffer } = options

  const height = headerHeight
    + padding
    + numTasks * (barHeight + padding)

  const numDays = end.diff(start).as('days')

  const dates = Array.from({ length: numDays }).map((_, index) => start.plus({ days: index }))

  const width = numDays * columnWidth

  const svgHeight = React.useMemo(
    () => height + padding + buffer,
    [height, padding]
  )

  return (
    <svg width={width} height={svgHeight} className="GenjoGantt__root">
      <g className="GenjoGantt__grid">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          className="GenjoGantt__grid__background"
        />

        {/* ROWS LAYER */}
        <g>
          {Array.from({ length: numTasks }).map((_, index) => (
            <GanttRow
              key={`row__${index}`}
              index={index}
              width={width}
            />
          ))}
        </g>

        {/* LINES */}
        <g>
          {Array.from({ length: numTasks }).map((_, index) => {
            const rowY = (
              + options.headerHeight
              + (options.padding / 2)
              + index * (options.barHeight + options.padding)
            )

            return (
              <line
                key={`line__${index}`}
                x1={0}
                x2={width}
                y1={rowY + options.barHeight + options.padding}
                y2={rowY + options.barHeight + options.padding}
                className="GenjoGantt__grid__line"
              />
            )
          })}
        </g>

        {/* HEADER */}
        <rect
          x={0}
          y={0}
          width={width}
          height={options.headerHeight + options.headerBuffer}
          className="GenjoGantt__grid__header"
        />

        {/* TICKS */}
        {dates.map((date, index) => {
          if (mode === 'month' && date.day !== 1) {
            return null
          }

          if (mode === 'week' && date.weekday !== 1) {
            return null
          }

          // Put a border on monday and saturday
          const isThick = date.weekday === 1 || date.weekday === 6

          const tickX = columnWidth * index
          const tickY = options.headerHeight + options.padding / 2
          const tickHeight = (options.barHeight + options.padding) * numTasks

          return (
            <path
              key={index}
              d={`M ${tickX} ${tickY} v ${tickHeight}`}
              className={clsx(
                'GenjoGantt__grid__tick',
                isThick && 'GenjoGantt__grid__thick-tick',
              )}
            />
          )
        })}

        {/* HIGHLIGHTS */}
        {/*<rect
          x={todayX}
          y={0}
          width={columnWidth}
          height={(options.barHeight + options.padding) * tasks.length + options.headerHeight + options.padding / 2}
          className="GenjoGantt__grid__today-highlight"
        />*/}
      </g>

      <g className="GenjoGantt__dates">
        {dates.map((date, index) => (
          <React.Fragment key={index}>
            {date.day === 1 && (
              <text
              x={index * columnWidth + columnWidth * date.daysInMonth / 2}
              y={options.headerHeight - 25}
              className="GenjoGantt__dates__upper-text"
              >
                {date.toFormat('MMMM y')}
              </text>
            )}

            {(mode === 'day' || (mode === 'week' && date.weekday === 1) || (mode === 'month' && date.day === 1)) && (
              <text
                y={options.headerHeight}
                x={index * columnWidth + columnWidth / 2}
                className="GenjoGantt__dates__lower-text"
              >
                {date.day}
              </text>
            )}
          </React.Fragment>
        ))}
      </g>

      {/*<g className="GenjoGantt__arrow">
        {dependencies.map(dep => (
          <Arrow key={dep.id} dep={dep} />
        ))}
        </g>*/}

      <g className="GenjoGantt__bar">
        {children}
      </g>

      {/*<g className="GenjoGantt__details">

      </g>*/}
    </svg>
  )
}

GanttSvg.propTypes = {
  children: PropTypes.node,
}
