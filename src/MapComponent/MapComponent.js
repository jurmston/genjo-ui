import * as React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import { useGoogleMaps } from '../GoogleMapsProvider'
import { MapContext } from './MapContext'
import { composePosition, attachEventListeners } from './utils'


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

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: 0,
    padding: 0,
    paddingBottom: props => `${props.aspectRatio * 100}%`,
  },

  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  map: {
    position: 'absolute',
    inset: 0,
  }
}))


export const MapComponent = ({
  children,
  aspectRatio = 9 / 16,
  styles,

  // Google Map Props
  zoom = 14,
  center,
  disableDoubleClickZoom = false,
  ...listeners
}) => {
  const classes = useStyles({ aspectRatio })
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
      <div className={classes.root} styles={styles}>
        <div className={classes.container}>
          <div ref={mapContainerRef} className={classes.map}>
            Loading...
          </div>
        </div>
        {children}
      </div>
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
