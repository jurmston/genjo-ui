import * as React from 'react'

export const TextEditorContext = React.createContext()
export const useTextEditor = () => React.useContext(TextEditorContext)
