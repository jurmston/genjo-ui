import * as React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import { useGoogleMaps } from '../GoogleMapsProvider'
import { MapContext } from './MapContext'
import { composePosition, attachEventListeners } from './utils'
import AspectRatioBox from '../AspectRatioBox'


const VALID_MAP_EVENTS = new Set([
  'onReady',
  'onClick',
  'onDragEnd',
  'onRecenter',
  'onBoundsChanged',
  'onCenterChanged',
  'onDoubleClick',
  'onDragStart',
  'onHeadingChanged',
  'onIdle',
  'onMapTypeIdChanged',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onProjectionChanged',
  'onResize',
  'onRightClick',
  'onTilesLoaded',
  'onTiltChanged',
  'onZoomChanged'
])

const mapListenerProps = [...VALID_MAP_EVENTS].reduce((result, handle) => {
  result[handle] = PropTypes.func
  return result
}, {})



export const MapComponent = ({
  children,
  aspectRatio = 16 / 9,

  // Google Map Props
  zoom = 14,
  center,
  disableDoubleClickZoom = false,
  ...listeners
}) => {
  const { status, google } = useGoogleMaps()
  const mapContainerRef = React.useRef()

  const [map, setMap] = React.useState(null)

  // Initialize map and load into container
  React.useEffect(() => {
    if (!map && status === 'ready') {
      const composedCenter = composePosition({ position: center, google })

      const newMap = new google.maps.Map(mapContainerRef.current, {
        zoom,
        center: composedCenter,
        disableDoubleClickZoom,
      })

      attachEventListeners({
        target: newMap,
        ...listeners,
      })

      setMap(newMap)
    }
  }, [status, google])

  // Update the map's center when `center` prop changes.
  React.useEffect(
    () => {
      if (map) {
        const composedCenter = composePosition({ position: center, google })
        map.setCenter(composedCenter)
      }
    },
    [map, center]
  )

  return (
    <MapContext.Provider
      value={{
        google,
        map,
      }}
    >
      <AspectRatioBox
        aspectRatio={aspectRatio}
      >
        <Box
          ref={mapContainerRef}
          sx={{ position: 'absolute', inset: 0, borderRadius: 1 }}
        >
          Loading...
        </Box>
        {children}
      </AspectRatioBox>
    </MapContext.Provider>
  )
}

MapComponent.propTypes = {
  // TODO: add a check for this.
  /** Valid GoogleMapProvider elements. */
  children: PropTypes.node,
  /**
   * The decimal value of the aspect ratio of the out map container expressed
   * the as `height / width`.
   */
  aspectRatio: PropTypes.number,
  /** Styles applied directly to the container. */
  styles: PropTypes.object,

  // Google Map Props
  zoom: PropTypes.number,
  /** The center of the map. The map will recenter when this value is changed. */
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  /** If `true`, the map will not zoom in when double clicked. */
  disableDoubleClickZoom: PropTypes.bool,
  ...mapListenerProps,
}
