import * as React from 'react'



export function useCurrentLocation(shouldUpdate = false, updateInterval = 1000) {
  const [state, setState] = React.useState({
    location: null,
    isLoading: false,
    error: null,
  })

  const [iteration, forceUpdate] = React.useReducer(x => x + 1, 0)
  const intervalRef = React.useRef()

  React.useEffect(
    () => {
      let isActive = true

      setState({ ...state, isLoading: true })
      if (navigator?.geolocation) {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
          const geoPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })

          try {
            const { coords } = await geoPromise
            if (isActive) {
              setState({ location: coords, error: null, isLoading: false })

              if (shouldUpdate) {
                intervalRef.current = setTimeout(forceUpdate, updateInterval)
              }
            }
          } catch (e) {
            if (isActive) {
              setState({ ...state, error: e, isLoading: false })
            }
          }
        })()
      }

      return () => {
        isActive = false
        clearInterval(intervalRef.current)
      }
    },
    [iteration, shouldUpdate, updateInterval]
  )

  return state
}