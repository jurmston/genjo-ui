import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { DateTime} from 'luxon'
import { GanttRow } from './GanttRow'
import { useGantt } from './useGantt'


export function GanttSvg({ children }) {
  const { numTasks, options, start, end, mode, drag, containerRef, todayX } = useGantt()

  const {
    padding,
    barHeight,
    headerHeight,
    columnWidth,
    buffer,
    textPadding,
    textHeight,
    rowHeight,
  } = options

  const height = headerHeight
    + numTasks * rowHeight

  const numDays = end.diff(start).as('days')

  const dates = Array.from({ length: numDays }).map((_, index) => start.plus({ days: index }))

  const width = numDays * columnWidth

  const today = DateTime.now().toISODate()

  function handleScrollToDate(event) {
    if (!containerRef.current) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const { left } = event.target.getBoundingClientRect()
    const { width } = containerRef.current.getBoundingClientRect()
    containerRef.current.scrollLeft = event.clientX - left - width / 2
  }

  return (
    <svg width={width} height={height} className="GenjoGantt__root">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          className="GenjoGantt__grid__background"
        />

        <rect
          x={0}
          y={0}
          width={width}
          height={options.headerHeight}
          onClick={handleScrollToDate}
          style={{ fill: '#fff' }}
        />
        {/* ROWS LAYER */}
        {/*<g>
          {Array.from({ length: numTasks }).map((_, index) => (
            <GanttRow
              key={`row__${index}`}
              index={index}
              width={width}
            />
          ))}
          </g>*/}

        {/* LINES */}
        <g style={{ pointerEvents: 'none' }}>
          {Array.from({ length: numTasks }).map((_, index) => {
            const rowY = (
              + options.headerHeight
              + index * options.rowHeight
            )

            return (
              <line
                key={`line__${index}`}
                x1={0}
                x2={width}
                y1={rowY}
                y2={rowY + (index === 0 ? 2 : 1)}
                className="GenjoGantt__grid__line"
              />
            )
          })}

          {/* TICKS */}
          {dates.map((date, index) => {
            const isFull = (mode === 'day' && date.weekday === 1)
              || (mode === 'month' && date.day === 1)
              || (mode === 'week' && date.weekday === 1)
              || (mode === 'quarter' && date.month % 3 === 0 && date.day === 1)

            const tickX = columnWidth * index
            const tickY = options.tickStart + (isFull ? 0 : options.tickDelta)
            const tickHeight = isFull ? options.largeTickSize : options.smallTickSize

            const lineHeight = rowHeight * numTasks
            const lineY = options.headerHeight + 2

            const isoDate = date.toISODate()
            const isToday = isoDate === today || isoDate === drag?.date?.toISODate()

            return (
              <React.Fragment key={index}>
                <path
                  d={`M ${tickX} ${tickY} v ${tickHeight}`}
                  className={'GenjoGantt__grid__tick'}
                  style={{
                    strokeWidth: isFull || isToday ? 3 : 1,
                    stroke: isToday ? '#f97316' : '#c2c2c2',
                  }}
                />

                {isFull && (
                  <path
                    d={`M ${tickX} ${lineY} v ${lineHeight}`}
                    className={'GenjoGantt__grid__tick'}
                  />
                )}
              </React.Fragment>
            )
          })}

        {dates.map((date, index) => {
          const hasUpperText = date.day === 1 && (
            mode === 'quarter' ? date.month % 3 === 0 : true
          )

          const upperTextDays = mode === 'quarter'
            ? date.endOf('quarter').diff(date.startOf('quarter')).as('days')
            : date.daysInMonth

          const upperTextFormatTokens = mode === 'quarter'
            ? 'Qq y'
            : 'MMMM y'

          return (
            <React.Fragment key={index}>
              {hasUpperText && (
                <text
                  x={index * columnWidth + (columnWidth * upperTextDays) / 2}
                  y={options.headerPadding + options.textHeight / 2}
                  className="GenjoGantt__dates__upper-text"
                  style={{ fontSize: options.textSize, fontWeight: 700 }}
                >
                  {date.toFormat(upperTextFormatTokens)}
                </text>
              )}

              {(mode === 'day' || (mode === 'week' && date.weekday === 1)) && (
                <text
                  y={options.tickStart + options.largeTickSize / 2}
                  x={index * columnWidth + columnWidth / 2}
                  className="GenjoGantt__dates__lower-text"
                  style={{ fontSize: options.textSize }}
                >
                  {date.day}
                </text>
              )}
            </React.Fragment>
          )
        })}
      </g>

      <g>
        {children}
      </g>

    </svg>
  )
}

GanttSvg.propTypes = {
  children: PropTypes.node,
}
