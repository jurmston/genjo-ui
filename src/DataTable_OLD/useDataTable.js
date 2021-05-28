import * as React from 'react'
import DataTableContext from './DataTableContext'

export const useDataTable = () => {
  const context = React.useContext(DataTableContext)

  if (context === undefined) {
    throw new Error('useDataTable must be within a DataTableContext')
  }

  return context
}

export default useDataTable
