const COLUMN_WIDTHS = {
  day: 38,
  week: 24,
  month: 10,
  quarter: 4,
  year: 2,
}


const DEFAULT_BUFFER_DAYS = 360
const DEFAULT_PADDING = 4
const DEFAULT_HEADER_PADDING = 16
const DEFAULT_ROW_PADDING = 8
const DEFAULT_BAR_HEIGHT = 24
const DEFAULT_HANDLE_WIDTH = 6
const DEFAULT_HANDLE_BUFFER = 3
const DEFAULT_ARROW_CURVE = 2

const DEFAULT_TEXT_PADDING = 0
const DEFAULT_TEXT_SIZE = 12
const DEFAULT_TEXT_HEIGHT = 0
const DEFAULT_SMALL_TICK_SIZE = 16
const DEFAULT_LARGE_TICK_SIZE = 18

const DEFAULT_UPCOMING_DAYS = 3


export function initializeDrawOptions({ options = {}, mode = 'day' }) {
  const result = {
    bufferDays: options?.bufferDays || DEFAULT_BUFFER_DAYS,
    padding: options?.padding || DEFAULT_PADDING,
    rowPadding: options?.rowPadding || DEFAULT_ROW_PADDING,
    headerPadding: options?.headerPadding || DEFAULT_HEADER_PADDING,
    barHeight: options?.barHeight || DEFAULT_BAR_HEIGHT,
    handleWidth: options?.handleWidth || DEFAULT_HANDLE_WIDTH,
    handleBuffer: options?.handleBuffer || DEFAULT_HANDLE_BUFFER,
    arrowCurve: options?.arrowCurve || DEFAULT_ARROW_CURVE,
    columnWidth: options?.columnWidth || COLUMN_WIDTHS[mode],
    textPadding: options?.textPadding || DEFAULT_TEXT_PADDING,
    textSize: options?.textSize || DEFAULT_TEXT_SIZE,
    textHeight: options?.textHeight || DEFAULT_TEXT_HEIGHT,
    smallTickSize: options?.smallTickSize || DEFAULT_SMALL_TICK_SIZE,
    largeTickSize: options?.largeTickSize || DEFAULT_LARGE_TICK_SIZE,
    upcomingDays: options?.upcomingDats || DEFAULT_UPCOMING_DAYS,
  }

  // Derived values
  result.rowHeight = 2 * result.padding + result.textHeight + result.textPadding + result.barHeight
  result.barPadding = result.padding + result.textHeight + result.textPadding
  result.headerHeight = 2.5 * result.headerPadding + result.textHeight + result.largeTickSize
  result.tickDelta = (result.largeTickSize - result.smallTickSize) / 2
  result.tickStart = 2 * result.headerPadding + result.textHeight

  return result
}
