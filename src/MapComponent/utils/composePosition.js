/**
 * Convert raw javascript objects into google.maps.LatLng
 */
export function composePosition({ position, google }) {
  if (position instanceof google.maps.LatLng) {
    return position
  }

  const { lat = null, lng = null } = position ?? {}

  return new google.maps.LatLng(lat, lng)
}
