import * as React from 'react'
import isEqual from 'react-fast-compare'



const createContent = (defaultValue = '') => ([{
  type: 'paragraph',
  children: [{ text: defaultValue }],
}])


function deserialize(value) {
  try {
    if (value) {
      return JSON.parse(value)
    }
  } catch (err) {
    if (typeof value === 'string') {
      return createContent(value)
    } else {
      console.log(err)
    }
  }

  return createContent()

}


/**
 *  Helper hook for serializing/deserializing SlateJS JSON.
 * @param {string} value Serialized SlateJS JSON.
 * @returns {*}
 */
export function useTextContent(serializedValue = '') {
  const [value, setValue] = React.useState(deserialize(serializedValue))

  // An incrementing key that updates on saves or resets to allow the
  // TextEditor to render with a new initial value.
  const [resetKey, setResetKey] = React.useState(0)

  const parsedOriginalTextContent = React.useMemo(
    () => deserialize(serializedValue),
    [serializedValue]
  )

  const isDirty = React.useMemo(
    () => !isEqual(value, parsedOriginalTextContent),
    [value, parsedOriginalTextContent]
  )

  React.useEffect(
    () => {
      setValue(parsedOriginalTextContent)
      setResetKey(k => k + 1)
    },
    [parsedOriginalTextContent]
  )

  const reset = React.useCallback(
    () => {
      setValue(parsedOriginalTextContent)
      setResetKey(k => k + 1)
    },
    [parsedOriginalTextContent]
  )

  return {
    value,
    setValue,
    isDirty,
    reset,
    resetKey,
  }
}
