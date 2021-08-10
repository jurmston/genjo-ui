import ngeohash from 'ngeohash'


const DEFAULT_GEOCODER_COMPONENTS_MAP = {
  country: ['short_name', 'country'],
  administrative_area_level_1: ['short_name', 'state'],
  administrative_area_level_2: ['long_name', 'county'],
  locality: ['long_name', 'city'],
  postal_town: ['long_name', 'city'],
  postal_code: ['long_name', 'postalCode'],
  postal_code_suffix: ['long_name', 'postalCodeSuffix'],
  subpremise: ['long_name', 'subpremise'],
  route: ['long_name', 'street'],
  street_number: ['long_name', 'streetNumber'],
}

/**
 * Parses and interprets the results from a Google Maps Places geocoder query.
 *
 * @param {*} results
 * @returns
 */
export function parseGeocoderResults(
  results,
  componentsMap = DEFAULT_GEOCODER_COMPONENTS_MAP,
) {
  const place = results?.[0]

  if (!place) {
    return
  }

  // Construct Geopoint
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  const geohash = ngeohash.encode(latitude, longitude)

  const geopoint = { latitude, longitude, geohash }

  // Formatted Address
  const formattedAddress = place.formatted_address

  // Place id
  const placeId = place.place_id

  // Components
  const components = {}

  for (let component of place.address_components) {
    const key = component?.types[0]
    const [nameType, name] = componentsMap[key] ?? []

    // Skip components not in `componentMap`
    if (name === undefined) {
      continue
    }

    const value = component?.[nameType] ?? ''
    components[name] = value
  }

  return {
    geopoint,
    formattedAddress,
    placeId,
    components,
  }
}