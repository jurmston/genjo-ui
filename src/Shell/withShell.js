import * as React from 'react'
import Shell from './Shell'


export const withShell = (Component, shellProps) => {
  const WrappedComponent = props => (
    <Shell {...shellProps}>
      <Component {...props} />
    </Shell>
  )

  return WrappedComponent
}

export default withShell
