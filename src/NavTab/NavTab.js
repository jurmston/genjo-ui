import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

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
    minHeight: 44,
    minWidth: 'unset',
  },
  wrapper: {
    color: theme.palette.text.primary,
    textTransform: 'initial',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `0 16px`,
  },
}))

export const NavTab = props => {
  const classes = useStyles()

  return (
    <Tab
      classes={{
        root: classes.root,
        wrapper: classes.wrapper,
      }}
      {...props}
    />
  )
}

export default NavTab
