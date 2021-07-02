import { EVENT_MAP } from './events'

/**
 * Attaches a set of valid event callbacks to a Google maps element using the
 * naming convention of React's SyntheticEvents.
 *
 * @param {object} config
 * @param {any} config.target A Google Maps element (e.g. Marker, Map, etc)
 * @param {...function} config.listeners Key-value pairs of callbacks named
 *   with valid React-style event names. The will be converted to native DOM
 *   names.
 */
export function attachEventListeners({ target, ...listeners }) {
  Object.entries(listeners).forEach(([handle, callback]) => {
    const nativeHandle = EVENT_MAP[handle]

    if (!nativeHandle) {
      console.warn(`Event handler ${handle} is not a valid Google Maps event`)
      return
    }

    // Only attach the listener if a callback was included in the target props.
    if (callback) {
      target.addListener(nativeHandle, callback)
    }
  })
}
