import * as React from 'react'


/**
 * Hook to syncronize a prop value with useState. The state value will
 * immediately update if the prop value changes.
 *
 * I suppose values other than props could be used to. 😉
 *
 * Inspired by: Kent C. Dodds
 * https://epicreact.dev/myths-about-useeffect/
 *
 * @param {*} propValue The value from props that you wish to sync.
 * @returns
 */
export function useSyncedProp(propValue) {
  const [syncedProp, setSyncedProp] = React.useState(propValue)

  React.useEffect(
    () => {
      setSyncedProp(propValue)
    },
    [propValue]
  )

  return [syncedProp, setSyncedProp]
}
