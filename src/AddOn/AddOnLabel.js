import * as React from 'react'
import PropTypes from 'prop-types'

import { useFormControl } from '@mui/material/FormControl'
import { AddOn } from './AddOn'


export function AddOnLabel({ id: idOverride, component, position, children, sx, ...props }) {
  const isStart = position === 'start'

  const muiFormControl = useFormControl()

  const ref = React.useRef(null)

  const [id, setId] = React.useState(idOverride)
  React.useEffect(() => {
    if (idOverride) {
      return
    }

    const inputId = isStart
      ? ref.current?.nextElementSibling?.id || ''
      : ref.current?.previousElementSibling?.id || ''

    setId(inputId)
  }, [ref, idOverride])

  return (
    <AddOn
      {...props}
      component={component || 'label'}
      ref={ref}
      htmlFor={id}
      position={position}
      sx={{
        fontWeight: 500,
        color: muiFormControl?.error
          ? 'error.main'
          : muiFormControl?.focused
          ? `${muiFormControl?.color}.main`
          : 'text.secondary',
        ...sx,
      }}
    >
      {children}
      {muiFormControl?.required ? '*' : ''}
    </AddOn>
  )
}

AddOnLabel.propTypes = {
  id: PropTypes.string,
  component: PropTypes.any,
  position: PropTypes.oneOf(['start', 'end']),
  children: PropTypes.node,
  sx: PropTypes.object,
}
