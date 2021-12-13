import * as React from 'react'
import PropTypes from 'prop-types'

import { useMap } from './useMap'
import { composePosition, createMarker } from './utils'


const VALID_MARKER_EVENTS = new Set([
  'onClick',
  'onDoubleClick',
  'onDragEnd',
  'onMouseDown',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onRecenter',
])

const markerListenerProps = [...VALID_MARKER_EVENTS].reduce((result, handle) => {
  result[handle] = PropTypes.func
  return result
}, {})


export const Marker = ({
  position,
  icon,
  label,
  title,
  draggable,
  infoWindow,
  ...listeners
}) => {
  const { map, google } = useMap()
  const [marker, setMarker] = React.useState(null)

  React.useEffect(
    () => {
      if (map && google && !marker) {
        const newMarker = createMarker({
          google,
          map,
          position,
          icon,
          label,
          title,
          draggable,
          infoWindow,
          listeners,
        })

        setMarker(newMarker)
      }
    },
    [map, google, marker]
  )

  // Update the marker's position when `position` prop changes.
  React.useEffect(
    () => {
      if (marker) {
        const newPosition = composePosition({ position, google })
        marker.setPosition(newPosition)
      }
    },
    [marker, position]
  )

  return null
}

Marker.propTypes = {
  position: PropTypes.object,
  icon: PropTypes.object,
  label: PropTypes.string,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  ...markerListenerProps,
}
