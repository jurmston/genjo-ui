import * as React from 'react'

import LoaderContext from './LoaderContext'

export const useLoader = () => {
  const context = React.useContext(LoaderContext)

  if (context === undefined) {
    throw new Error(`useLoader must be within a LoaderProvider`)
  }

  return context
}

export default useLoader
