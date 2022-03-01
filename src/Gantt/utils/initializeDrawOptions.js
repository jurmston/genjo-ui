const COLUMN_WIDTHS = {
  day: 38,
  week: 24,
  month: 10,
}

const DEFAULT_HEADER_HEIGHT = 50
const DEFAULT_PADDING = 16
const DEFAULT_BAR_HEIGHT = 28
const DEFAULT_BUFFER = 100
const DEFAULT_HEADER_BUFFER = 10
const DEFAULT_HANDLE_WIDTH = 6
const DEFAULT_HANDLE_BUFFER = 3
const DEFAULT_ARROW_CURVE = 5


export function initializeDrawOptions(options = {}, mode = 'day') {
  return {
    headerHeight: options?.headerHeight || DEFAULT_HEADER_HEIGHT,
    padding: options?.padding || DEFAULT_PADDING,
    barHeight: options?.barHeight || DEFAULT_BAR_HEIGHT,
    buffer: options?.buffer || DEFAULT_BUFFER,
    headerBuffer: options?.headerBuffer || DEFAULT_HEADER_BUFFER,
    handleWidth: options?.handleWidth || DEFAULT_HANDLE_WIDTH,
    handleBuffer: options?.handleBuffer || DEFAULT_HANDLE_BUFFER,
    arrowCurve: options?.arrowCurve || DEFAULT_ARROW_CURVE,
    columnWidth: options?.columnWidth || COLUMN_WIDTHS[mode],
  }
}
