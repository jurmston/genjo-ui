import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'


const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      opacity: 1
    },
    minHeight: 44,
    minWidth: 96,
    [theme.breakpoints.up('md')]: {
      minWidth: 120
    }
  },
  wrapper: {
    // zIndex: 2,
    // marginTop: spacing(0.5),
    textTransform: 'initial',
    '& .Mui-selected': {
      color: theme.palette.text.primary,
    },
  },
}))

export const ButtonTab = props => {
  const classes = useStyles()

  return (
    <Tab
      {...props}
      classes={{
        root: classes.root,
        wrapper: classes.wrapper,
      }}
    />
  )
}

export default ButtonTab
