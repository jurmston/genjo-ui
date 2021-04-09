import * as React from 'react'
import isEqual from 'react-fast-compare'

export function useValues(initialValues = {}) {
  const [values, setValues] = React.useState({})
  const [originalValues, setOriginalValues] = React.useState({})

  const setFieldValue = React.useCallback((field, value) => setValues({ ...values, [field]: value }), [values])

  const resetValues = React.useCallback(() => {
    setValues({ ...initialValues })
    setOriginalValues({ ...initialValues })
  }, [initialValues])

  const isDirty = !isEqual(values, originalValues)

  // Reset values whenever the initialValues input changes.
  React.useEffect(() => {
    setValues({ ...initialValues })
    setOriginalValues({ ...initialValues })
  }, [initialValues])

  return {
    values,
    setValues,
    setFieldValue,
    resetValues,
    isDirty,
  }
}

export default useValues
