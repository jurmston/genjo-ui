const DEFAULT_FORMATTER_COMPONENTS_MAP = {
  postalCode: 'postalCode',
  postalCodeSuffix: 'postalCodeSuffix',
  street: 'street',
  streetNumber: 'streetNumber',
  subpremise: 'subpremise',
  country: 'country',
  county: 'county',
  state: 'state',
  city: 'city',
}

export function formatAddressComponents(components, options = {}) {
  const {
    componentsMap = DEFAULT_FORMATTER_COMPONENTS_MAP,
    shouldIncludePostalCodeSuffix = false,
    shouldIncludeSubpremise = false,
    shouldIncludeCounty = false,
    shouldIncludeCountry = false,
    lineSeparator = '\n'
  } = options

  function getComponent(mapKey) {
    const componentKey = componentsMap[mapKey] ?? ''
    return components[componentKey] ?? ''
  }

  const postalCode = getComponent('postalCode')
  const postalCodeSuffix = getComponent('postalCodeSuffix')

  const formattedPostalCode = shouldIncludePostalCodeSuffix && Boolean(postalCodeSuffix)
    ? `${postalCode}-${postalCodeSuffix}`
    : postalCode

  const streetNumber = getComponent('streetNumber')
  const street = getComponent('street')
  const subpremise = shouldIncludeSubpremise ? getComponent('subpremise') : ''
  const formattedStreetAddress = [streetNumber, street, subpremise].filter(x => x).join(' ')

  const city = getComponent('city')
  const county = shouldIncludeCounty ? getComponent('county') : ''
  const state = getComponent('state')
  const formattedCityState = [city, county, state].filter(x => x).join(', ')

  const country = shouldIncludeCountry ? getComponent('country') : ''

  const result = [
    formattedStreetAddress,
    `${formattedCityState} ${formattedPostalCode}`,
    country,
  ]
    .filter(x => x)
    .join(lineSeparator)

  return result
}
