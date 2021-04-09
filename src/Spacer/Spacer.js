import React from 'react'
import PropTypes from 'prop-types'

/**
 * Utility to fill the gaps.
 *
 * From:
 * https://www.joshwcomeau.com/react/modern-spacer-gif/
 */
export const Spacer = ({ size, axis = '', style = {}, ...delegated }) => {
  const width = axis === 'vertical' ? 1 : size
  const height = axis === 'horizontal' ? 1 : size

  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  )
}

Spacer.propTypes = {
  size: PropTypes.number,
  axis: PropTypes.oneOf(['', 'horizontal', 'vertical']),
  style: PropTypes.object,
}

export default Spacer
