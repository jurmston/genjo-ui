import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'


export function Button({
  children,
  color = 'red',
  variant = '500',
  ...props
}) {

  return (
    <button
      style={{ color: `var(--color-${color}-${variant})`}}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {

}
