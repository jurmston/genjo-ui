import Tab from '@material-ui/core/Tab'
import { styled } from '@material-ui/core/styles'


export const ButtonTab = styled(Tab)(({ theme }) => ({
  '&:hover': {
    opacity: 1,
  },
  minHeight: 'unset',
  minWidth: 96,
  [theme.breakpoints.up('md')]: {
    minWidth: 120,
  },

  textTransform: 'initial',
}))

export default ButtonTab
