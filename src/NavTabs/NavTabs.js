import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 56,
    height: '100%',
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
      borderBottom: `3px solid ${theme.palette.primary.main}`,
      // borderLeft: `1px solid ${theme.palette.divider}`,
      // borderRight: `1px solid ${theme.palette.divider}`,
      // borderTopLeftRadius: theme.shape.borderRadius,
      // borderTopRightRadius: theme.shape.borderRadius,
      // backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.action.selected,
      // backgroundColor: theme.palette.grey[50],
      // boxShadow: 'inset 1px 0 2px 0 rgba(0,0,0,0.16), inset -1px 0 2px 0 rgba(0,0,0,0.16)',
    },
  },
}))

export const NavTabs = props => {
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

export default NavTabs
