import { styled } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'


export const SimpleTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: 16,
  '& .MuiTabs-indicator': {
    height: 2,
  },
}))
