import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'


export const SimpleTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  alignItems: 'flex-start',
  padding: 4,
  minWidth: 0,
  fontWeight: 500,
  marginRight: theme.spacing(2),
  typography: 'button',

  '&.MuiTab-labelIcon': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 0,

    '& .MuiSvgIcon-root': {
      marginRight: 4,
      marginBottom: 0,
    },
  },
}))
