import { range, moveArrayItem } from './arrays'

describe('utils > arrays > range', () => {
  it('should return the correct array', () => {
    expect(range(4)).toEqual([0, 1, 2, 3])
    expect(range(3, 6)).toEqual([3, 4, 5])
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    expect(range(10, 0, -1)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    expect(range(8, 2, -2)).toEqual([8, 6, 4])
    expect(range(8, 2)).toEqual([])
    expect(range(8, 2, 2)).toEqual([])
    expect(range(1, 5, -1)).toEqual([])
    expect(range(1, 5, -2)).toEqual([])
  })
})

describe('utils > arrays > moveArrayItem', () => {
  it('should return the correct array', () => {
    expect(moveArrayItem([1, 2], 0, 1)).toEqual([2, 1])
    expect(moveArrayItem([1, 2, 3, 4, 5, 6], 4, 2)).toEqual([1, 2, 5, 3, 4, 6])

    // Move the item to the same spot
    expect(moveArrayItem([1, 2], 0, 0)).toEqual([1, 2])

    // Check that a negative source returns the original
    expect(moveArrayItem([1, 2], -1, -1)).toEqual([1, 2])

    // Check that a source greater than the length returns the original
    expect(moveArrayItem([1, 2], 2, 2)).toEqual([1, 2])

    // Move the source to an index greater than the legnth; should place it on
    // the end.
    expect(moveArrayItem([1, 2], 0, 2)).toEqual([2, 1])

    // Move the source to a negative index; should place it at the beginning
    expect(moveArrayItem([1, 2], 1, -1)).toEqual([2, 1])
  })
})