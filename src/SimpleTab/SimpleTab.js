import { styled } from '@material-ui/styles'
import Tab from '@material-ui/core/Tab'


export const SimpleTab = styled(Tab)(({ theme }) => ({
  root: {
    textTransform: 'none',
    alignItems: 'flex-start',
    padding: 4,
    minWidth: 0,
    marginRight: theme.spacing(2),
    ...theme.typography.subtitle2,
  },
  labelIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 0,
    '& .MuiSvgIcon-root': {
      marginRight: 8,
      marginBottom: 0,
    }
  },
}))