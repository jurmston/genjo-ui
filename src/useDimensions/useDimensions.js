import React from 'react'

function getNodeDimensions(node) {
  const { height, width, x, y, top, bottom, left, right } = node.getBoundingClientRect()

  return {
    height,
    width,
    x,
    y,
    top,
    bottom,
    left,
    right,
  }
}

/**
 * From: https://github.com/Swizec/useDimensions/blob/master/src/index.ts
 *
 * Also see re. useLayoutEffect in SSR envs => isomorphicUseLayoutEffect
 * https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
export function useDimensions(isResponsive = true) {
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  const [node, setNode] = React.useState(null)

  const ref = React.useCallback(
    node => setNode(node),
    [],
  )

  React.useEffect(
    () => {
      let isActive = true

      if (node) {
        const measure = () => {
          if (isActive) {
            window.requestAnimationFrame(() => {
              setDimensions(getNodeDimensions(node))
            })
          }
        }

        isActive && measure()

        let remeasure
        if (isResponsive) {
          window.addEventListener('resize', measure)
          window.addEventListener('scroll', measure, true)

          // TODO(jeff): there is a weird glitch where the
          // initial dimensions are slightly different and the
          // hook doesn't catch it. This hack causes a manual
          // remeasure after a reasonable time but is pretty
          // damn hacky.
          remeasure = setTimeout(measure, 100)
        }

        return () => {
          isActive = false
          window.removeEventListener('resize', measure)
          window.removeEventListener('resize', measure)
          clearTimeout(remeasure)
        }
      }

      return () => { isActive = false }
    },
    [ref, node, isResponsive],
  )

  return [ref, dimensions, node]
}
