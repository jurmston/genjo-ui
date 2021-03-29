export function safeDivide(dividend, divisor) {
  if (!divisor) {
    return 0
  }

  return dividend / divisor
}


export function minMax(min, max, value) {
  return Math.min(max, Math.max(min, value))
}
