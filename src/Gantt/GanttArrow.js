import * as React from 'react'
import { useGantt } from './useGantt'


function GanttArrowInner({ dep }) {
  const { options, tasks, selectedId, drag } = useGantt()
  const { padding, headerHeight, barHeight, arrowCurve, rowHeight, barPadding } = options

  const fromTask = tasks[dep.from]
  const toTask = tasks[dep.to]

  const { index: fromIndex, dimensions: { x: fromX, width: fromWidth }} = fromTask
  const { index: toIndex, dimensions: { x: toX, y: toY }} = toTask

  const path = React.useMemo(
    () => {
      let startX = fromX + fromWidth / 2

      const condition = () => toX < startX + padding
        && startX > fromX + padding

      while(condition()) {
        startX -= 10
      }

      const startY = headerHeight
        + barHeight
        + rowHeight * fromIndex

      const endX = toX - padding / 2

      const endY = headerHeight
        + rowHeight * toIndex
        + barPadding
        + barHeight / 2

      const fromIsBelowTo = fromIndex > toIndex

      const clockwise = fromIsBelowTo ? 1 : 0
      const curveY = fromIsBelowTo ? -arrowCurve : arrowCurve
      const offset = fromIsBelowTo
        ? endY + arrowCurve
        : endY - arrowCurve

      const down1 = padding / 2 - arrowCurve
      const down2 = toY + barHeight / 2 - curveY

      const left = toX - padding

      return toX < fromX + padding
        ? `
          M ${startX} ${startY}
          v ${down1}
          a ${arrowCurve} ${arrowCurve} 0 0 1 -${arrowCurve} ${arrowCurve}
          H ${left}
          a ${arrowCurve} ${arrowCurve} 0 0 ${clockwise} -${arrowCurve} ${curveY}
          V ${down2}
          a ${arrowCurve} ${arrowCurve} 0 0 ${clockwise} ${arrowCurve} ${curveY}
          L ${endX} ${endY}
          m -5 -5
          l 5 5
          l -5 5
        `
        : `
          M ${startX} ${startY}
          V ${offset}
          a ${arrowCurve} ${arrowCurve} 0 0 ${clockwise} ${arrowCurve} ${curveY}
          L ${endX} ${endY}
          m -5 -5
          l 5 5
          l -5 5
        `
    },
    [fromX, fromIndex, fromWidth, toIndex, toX, toY, options],
  )

  // If either task doesn't have a start, the arrows render in strange ways.
  // Better to hide them.
  if (!toTask.hasStart) {
    return null
  }

  return (
    <path
      d={path}
      className="GenjoGantt__arrow"
      style={{
        stroke: selectedId === dep.from || drag?.draggableId === dep.from
          ? '#f00'
          : '#ccc',
      }}
    />
  )
}


function arrowPropsAreEqual(prevProps, nextProps) {
  return Boolean(nextProps.dep.drawKey)
    && prevProps.dep.drawKey === nextProps.dep.drawKey
}


export const GanttArrow = React.memo(GanttArrowInner, arrowPropsAreEqual)