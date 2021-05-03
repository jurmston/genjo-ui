import * as React from 'react'

/**
 * Callback to deserialize a string value in local storage to a desired
 * type.
 *
 * @callback fromStorage
 * @param {string} value The stringified value that will be transformed.
 * @returns {any} The desired, deserialized value.
 */

/**
 * Callback to serialize a value to a string for storage.
 *
 * @callback toStorage
 * @param {string} value The value to be stringified.
 * @returns {string} The value as a string.
 */

/**
 * Hook for retreiving and storing a single item in local/session storage.
 *
 * @param {object} config
 * @param {string} config.key A unique identified for the value in storage.
 * @param {any} [config.initialValue=null] The initial value to store if no value is already
 *   in storage.
 * @param {toStorage} [config.toStorage=x => x] Callback to serialize the value.
 *   Defaults to the identity function which will rely on the storage object
 *   to cast the value to a string.
 * @param {fromStorage} [config.fromStorage=x => x] Callback to deserialize the value
 *   from it's string representation in storage. Defaults to the identity
 *   function.
 * @param {localStorage|sessionStorage} [config.storage=sessionStorage] The
 *  storage mechanism to use. Defaults to `sessionStorage`.
 * @example
 * const [value, setValue] = useStoredState({
 *   key: 'myVariable',
 *   initialValue: true,
 *   toStorage: x => x ? 'true' : 'false',
 *   fromStorage: x => x === 'true',
 * })
 * @returns {[any, function]} Returns an array containing the current
 *   (deserialized) value and the callback to update the value.
 */
export const useStoredState = ({
  key,
  initialValue = null,
  toStorage = x => x,
  fromStorage = x => x,
  storage = sessionStorage,
}) => {
  if (!key) {
    throw new Error('A key must be provided for state value.')
  }

  const loadedValue = storage.getItem(key)

  const [value, setValue] = React.useState(
    loadedValue === null ? initialValue : fromStorage(loadedValue),
  )

  React.useEffect(
    () => {
      if (value === null || value === undefined) {
        storage.removeItem(key)
      } else {
        storage.setItem(key, toStorage(value))
      }
    },
    [key, value, toStorage, storage],
  )

  return [
    value,
    newValue => setValue(newValue === undefined ? null : newValue),
  ]
}

export default useStoredState
