import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles'


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
