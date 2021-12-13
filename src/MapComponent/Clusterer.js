import * as React from 'react'
import PropTypes from 'prop-types'

import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useMap } from './useMap'
import { createMarker } from './utils'


export function Clusterer({ children = [] }) {
  const { map, google } = useMap()
  const clustererRef = React.useRef()

  React.useEffect(
    () => {
      if (!map || !google || !children?.length || clustererRef.current) {
        return
      }

      const markers = children?.map?.(child => {
        const {
          position,
          icon,
          label,
          title,
          draggable,
          infoWindow,
          ...listeners
        } = child.props

        const marker = createMarker({
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

        return marker
      })

      clustererRef.current = new MarkerClusterer({
        markers,
        map,
      })
    },
    [children, google, clustererRef, map]
  )

  return null
}

Clusterer.propTypes = {
  children: PropTypes.node,
}
