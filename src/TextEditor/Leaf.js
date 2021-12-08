import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'


export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <span style={{ textDecoration: 'underline' }}>{children}</span>
  }

  return (
    <Box
      {...attributes}
      component="span"
      sx={{
        color: leaf.color || 'text.primary',
        backgroundColor: leaf.bgcolor || 'transparent',
      }}
    >
      {children}
    </Box>
  )
}

Leaf.propTypes = {
  attributes: PropTypes.any,
  leaf: PropTypes.any,
  children: PropTypes.node,
}

export default Leaf
