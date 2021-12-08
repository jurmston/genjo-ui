import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'


export function NavTabs({ sx, ...rest }) {
  return (
    <Tabs
      {...rest}
      sx={{
        minHeight: 56,
        height: '100%',

        '& .MuiTabs-flexContainer': {
          display: 'inline-flex',
          position: 'relative',
          zIndex: 1,
        },

        '& .MuiTabs-scroller': {
          padding: { md: '0 8px' },
        },

        '& .MuiTabs-indicator': {
          top: 0,
          bottom: 0,
          right: 0,
          height: 'auto',
          background: 'none',
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            boxSizing: 'border-box',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: 3,
            borderBottomColor: 'primary.main',
          },
        },
        ...sx,
      }}
    />
  )
}

NavTabs.propTypes = {
  sx: PropTypes.object,
}
