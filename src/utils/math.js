export function safeDivide(dividend, divisor) {
  if (!divisor) {
    return 0
  }

  return dividend / divisor
}


export function minMax(min, value, max) {
  return Math.min(max, Math.max(min, value))
}
