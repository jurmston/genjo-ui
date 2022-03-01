import * as React from 'react'
import { GanttContext } from './GanttContext'


export function useGantt() {
  const context = React.useContext(GanttContext)

  if (context === undefined) {
    throw new Error('useGantt must be used within GanttProvider')
  }

  return context
}
