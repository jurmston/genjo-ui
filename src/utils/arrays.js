export function range(start = 0, end, step) {
  if (end === undefined) {
    end = start
    start = 0
  }

  if (!step) {
    step = 1
  }

  let result = []
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i)
  }
  return result
}


/**
 * Moves a value at the sourceIndex to the destinationIndex and reorders the
 * other values.
 *
 * @returns A new array object with the newly moved items.
 */
 export function moveArrayItem(items, sourceIndex, destinationIndex) {
  const result = Array.from(items)

  // Check that the source index exists. If it doesn't,
  // return the original array.
  const sourceIndexIsValud = sourceIndex >= 0
    && sourceIndex < items.length

  if (!sourceIndexIsValud) {
    return result
  }

  // If the destination index is negative the item will be put at the start
  // of the array. If the index is greater than the legnth, it will be placed
  // at the end.
  const [removed] = result.splice(sourceIndex, 1)
  result.splice(destinationIndex, 0, removed)
  return result
}
