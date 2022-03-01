const SCROLL_DETECTION_WINDOW = 12
const SCROLL_AMOUNT = 20


export function handleScroll(event, containerRef) {
  const { x, width } = containerRef.current?.getBoundingClientRect() || { x: 0 }

  if (event.clientX < (x + SCROLL_DETECTION_WINDOW)) {
    containerRef.current.scrollLeft -= SCROLL_AMOUNT
  } else if (event.clientX > (x + width - SCROLL_DETECTION_WINDOW)) {
    containerRef.current.scrollLeft += SCROLL_AMOUNT
  }
}
