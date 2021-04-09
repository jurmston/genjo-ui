import * as React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.mode === 'light' ? '#eee' : theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    minHeight: 44,
  },
  flexContainer: {
    display: 'inline-flex',
    position: 'relative',
    zIndex: 1,
  },
  scroller: {
    [theme.breakpoints.up('md')]: {
      padding: '0 8px',
    },
  },
  indicator: {
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
    },
  },
}))

export const ButtonTabs = props => {
  const classes = useStyles()

  return (
    <Tabs
      {...props}
      classes={{
        root: classes.root,
        flexContainer: classes.flexContainer,
        scroller: classes.scroller,
        indicator: classes.indicator,
      }}
    />
  )
}

export default ButtonTabs
