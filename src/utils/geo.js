import geohash from 'ngeohash'

// const COMPONENTS = {
//   locality: '',
//   administrative_area_level_1: '',
//   administrative_area_level_2: '',
//   country: '',
//   postal_code: '',
//   route: '',
//   street_number: '',
//   postal_town: '',
//   postal_code_suffix: '',
//   subpremise: '',
// }

const COMPONENTS = new Set([
  'locality',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'country',
  'postal_code',
  'route',
  'street_number',
  'postal_town',
  'postal_code_suffix',
  'subpremise',
])

const SHORT_NAME_COMPONENTS = new Set(['country', 'adminstrative_area_level_1'])

export function parseGeocoderResults(results) {
  const place = results?.[0]

  if (!place) {
    return
  }

  console.log({ place })

  const lat = place.geometry.location.lat()
  const lng = place.geometry.location.lng()
  const formattedAddress = place.formatted_address
  const placeId = place.place_id

  const parsedComponents = {}

  for (let component of place.address_components) {
    const key = component?.types[0]
    const nameProp = SHORT_NAME_COMPONENTS.has(key) ? 'short_name' : 'long_name'
    const value = component?.[nameProp] ?? ''
    parsedComponents[key] = value
  }

  return {
    latitude: lat,
    longitude: lng,
    geohash: geohash.encode(lat, lng),
    formattedAddress,
    placeId,
    city: parsedComponents.locality || parsedComponents.postal_town || '',
    state: parsedComponents.administrative_area_level_1 || '',
    country: parsedComponents.country || '',
    postalCode: parsedComponents.postal_code || '',
    streetAddress: [parsedComponents.street_number, parsedComponents.route].filter(x => x).join(' '),
    county: parsedComponents.administrative_area_level_2 || '',
    postalCodeSuffix: parsedComponents.postal_code_suffix || '',
    subpremise: parsedComponents.subpremise || '',
  }
}

export function getFormattedAddress({
  streetAddress = '',
  city = '',
  state = '',
  postalCode = '',
  country = '',
  postalCodeSuffix = '',
  subpremise = '',
  includeCountry = false,
}) {
  const formattedCode = postalCodeSuffix && postalCode ? `${postalCode}-${postalCodeSuffix}` : postalCode

  const sepStreetSubpremise = streetAddress && subpremise ? ' ' : ''
  const sepCityState = city && state ? ', ' : ''
  const sepStatePostalCode = state && formattedCode ? ' ' : ''

  const result = [
    `${streetAddress}${sepStreetSubpremise}${subpremise}`,
    `${city}${sepCityState}${state}${sepStatePostalCode}${postalCode}`,
    includeCountry ? country : '',
  ]
    .filter(x => x)
    .join('\n')

  return result
}
