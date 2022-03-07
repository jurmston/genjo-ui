import * as React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'

import linkIcon from './icons/link.svg'

const ICON_SIZE = 14


export function GanttDependencyHandle({ x, y }) {

  return (
    <>
      <circle
        r={10}
        cx={x}
        cy={y}
        style={{
          fill: '#6366f1',
          filter: 'drop-shadow(1px 1px 1px rgb(0 0 0 / 0.25))',
        }}
      />

      <image
        href={linkIcon}
        x={x - ICON_SIZE / 2}
        y={y - ICON_SIZE / 2}
        height={ICON_SIZE}
        width={ICON_SIZE}
        style={{
          filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(230deg) brightness(107%) contrast(107%)',
        }}
      />
    </>
  )
}

GanttDependencyHandle.propTypes = {

}
