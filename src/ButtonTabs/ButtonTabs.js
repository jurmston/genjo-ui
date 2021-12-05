import * as React from 'react'

import Tabs from '@mui/material/Tabs'
import { styled } from '@mui/material/styles'


export const ButtonTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  minHeight: 'unset',

  '& .MuiTabs-flexContainer': {
    // display: 'inline-flex',
    position: 'relative',
    zIndex: 1,
  },
  // scroller: {
  //   [theme.breakpoints.up('md')]: {
  //     padding: '0 8px',
  //   },
  // },
  '& .MuiTabs-scrollButtons': {
    '&.Mui-disabled': {
      opacity: '0.3 !important',
    },
  },

  '& .MuiTabs-indicator': {
    top: 3,
    bottom: 3,
    // right: 3,
    height: 'auto',
    background: 'none',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 4,
      right: 4,
      bottom: 0,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.action.selected,
      // boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
      boxShadow: '0 2px 10px 0 rgb(21 27 38 / 10%)',
    },
  },
}))

export default ButtonTabs
