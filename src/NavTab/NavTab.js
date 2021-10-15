import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Tab from '@mui/material/Tab'

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      opacity: 1,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    minHeight: 56,
    minWidth: 'unset',

    color: theme.palette.text.secondary,
    textTransform: 'initial',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0 16px`,

    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },

}))

export const NavTab = props => {
  const classes = useStyles()

  return (
    <Tab
      classes={{
        root: classes.root,
        wrapper: classes.wrapper,
        labelIcon: classes.labelIcon,
      }}
      {...props}
    />
  )
}

export default NavTab
