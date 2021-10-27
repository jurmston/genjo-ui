import * as React from 'react'
import isEqual from 'react-fast-compare'



const createBlankContent = () => ([{
  type: 'paragraph',
  children: [{ text: '' }],
}])


function deserialize(value) {
  try {
    if (value) {
      return JSON.parse(value)
    }
  } catch (err) {
    console.log(err)
  }

  return createBlankContent()

}


/**
 *  Helper hook for serializing/deserializing SlateJS JSON.
 * @param {string} value Serialized SlateJS JSON.
 * @returns {*}
 */
export function useTextContent(serializedValue = '') {
  const [value, setValue] = React.useState(createBlankContent())

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
    },
    [parsedOriginalTextContent]
  )

  const reset = React.useCallback(
    () => setValue(parsedOriginalTextContent),
    [parsedOriginalTextContent]
  )

  return {
    value,
    setValue,
    isDirty,
    reset,
  }
}
