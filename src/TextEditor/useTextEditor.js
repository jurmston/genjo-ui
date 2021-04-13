import * as React from 'react'
import TextEditorContext from './TextEditorContext'

export const useTextEditor = () => {
  const context = React.useContext(TextEditorContext)

  if (context === undefined) {
    throw new Error(`useTextEditor can only be used in a TextEditorContext`)
  }

  return context
}

export default useTextEditor
