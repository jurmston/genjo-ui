import { styled } from '@mui/styles'
import Tabs from '@mui/material/Tabs'


export const SimpleTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: 16,
  '& .MuiTabs-indicator': {
    height: 2,
  },
}))
