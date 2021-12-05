import * as React from 'react'
import PropTypes from 'prop-types'
import Tab from '@mui/material/Tab'


export const NavTab = ({ sx, ...rest }) => {

  return (
    <Tab
      sx={{
        '&:hover': {
          opacity: 1,
        },

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
        minWidth: 'unset',

        color: 'text.secondary',
        textTransform: 'initial',
        padding: `0 16px`,

        '&.Mui-selected': {
          color: 'primary.main',
        },
        ...sx,
      }}
      {...rest}
    />
  )
}

NavTab.propTypes = {
  sx: PropTypes.object,
}
