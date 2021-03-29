import * as React from 'react'
import PropTypes from 'prop-types'

import { experimentalStyled } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


export const ButtonTabs = experimentalStyled(Tabs)(({ theme }) => ({
  '&.MuiTabs-root': {
    backgroundColor: theme.palette.mode === 'light' ? '#eee' : theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    minHeight: 44
  },
  '& .MuiTabs-flexContainer': {
    display: 'inline-flex',
    position: 'relative',
    zIndex: 1
  },
  '& .MuiTabs-scroller': {
    [theme.breakpoints.up('md')]: {
      padding: '0 8px',
    }
  },
  '& .MuiTabs-indicator': {
    top: 3,
    bottom: 3,
    right: 3,
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
      boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
    }
  },

}))
