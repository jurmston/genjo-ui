// Google Maps elements use event handler names similar or equal to native DOM
// events. To provide a more React-idiomatic experience this map converts from
// React SythenticEvent naming convention to the handlers used by Google Maps.
export const EVENT_MAP = {
  'onBoundsChanged': 'bounds_changed',
  'onCenterChanged': 'center_changed',
  'onClick': 'click',
  'onDoubleClick': 'dblclick',
  'onDragEnd': 'dragend',
  'onDragStart': 'dragstart',
  'onHeadingChange': 'heading_change',
  'onIdle': 'idle',
  'onMapTypeIdChanged': 'maptypeid_changed',
  'onMouseDown': 'mousedown',
  'onMouseMove': 'mousemove',
  'onMouseOut': 'mouseout',
  'onMouseOver': 'mouseover',
  'onMouseUp': 'mouseup',
  'onProjectionChanged': 'projection_changed',
  'onReady': 'ready',
  'onRecenter': 'recenter',
  'onResize': 'resize',
  'onRightClick': 'rightclick',
  'onTilesLoaded': 'tilesloaded',
  'onTiltChanged': 'tilt_changed',
  'onZoomChanged': 'zoom_changed',
}

export const VALID_MAP_EVENTS = new Set([
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

export const VALID_MARKER_EVENTS = new Set([
  'onClick',
  'onDoubleClick',
  'onDragEnd',
  'onMouseDown',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onRecenter',
])