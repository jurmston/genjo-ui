export const COLUMN_WIDTHS = {
  day: 38,
  week: 24,
  month: 10,
  quarter: 4,
}

export const PADDING = 8
export const HEADER_PADDING = 16
export const ROW_PADDING = 8
export const BAR_HEIGHT = 28
export const HANDLE_WIDTH = 6
export const HANDLE_BUFFER = 3
export const ARROW_CURVE = 5
export const TEXT_PADDING = 0
export const TEXT_SIZE = 12
export const TEXT_HEIGHT = 0
export const SMALL_TICK_SIZE = 16
export const LARGE_TICK_SIZE = 18

// Derived values
export const ROW_HEIGHT = 2 * PADDING + TEXT_HEIGHT + TEXT_PADDING + BAR_HEIGHT
export const BAR_PADDING = PADDING + TEXT_HEIGHT + TEXT_PADDING
export const HEADER_HEIGHT = 2.5 * HEADER_PADDING + TEXT_HEIGHT + LARGE_TICK_SIZE
export const TICK_DELTA = (LARGE_TICK_SIZE - SMALL_TICK_SIZE) / 2
export const TICK_START = 2 * HEADER_PADDING + TEXT_HEIGHT
