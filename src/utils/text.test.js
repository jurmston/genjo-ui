import { titleCase } from './text'

describe('utils > arrays > titleCase', () => {
  const options = {
    prefixes: ['De', 'Mac', 'Mc'],
    uppers: ['NASA', 'IBM', 'USA', 'US', 'UK', 'EU', 'OK', 'GIF', 'GIS', 'ASAP'],
    lowers: ['de', 'the', 'to', 'a', 'an', 'and'],
  }

  it('should return the correct value', () => {
    expect(titleCase({
      value: 'mr. magoo',
      ...options,
    })).toEqual('Mr. Magoo')

    expect(titleCase({
      value: 'tED mACdonALD',
      ...options,
    })).toEqual('Ted MacDonald')

    expect(titleCase({
      value: 'juan de santos, eu',
      ...options,
    })).toEqual('Juan de Santos, EU')

    expect(titleCase({
      value: 'jOE the bartender and jack devance',
      ...options,
    })).toEqual('Joe the Bartender and Jack DeVance')
  })
})