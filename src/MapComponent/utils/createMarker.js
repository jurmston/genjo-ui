import { attachEventListeners } from './attachEventListeners'
import { composePosition } from './composePosition'


export function createMarker({
  google,
  map,
  position,
  icon,
  label,
  title,
  draggable,
  infoWindow: infoWindowContent,
  listeners,
}) {
  const composedPosition = composePosition({ position, google })

  const marker = new google.maps.Marker({
    position: composedPosition,
    map,
    icon,
    label,
    title,
    draggable,
    optimized: false,
  })

  if (infoWindowContent) {
    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    })

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
    })
  }

  attachEventListeners({
    target: marker,
    ...listeners,
  })

  return marker
}
