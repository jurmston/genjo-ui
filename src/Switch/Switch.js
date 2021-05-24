import { experimentalStyled as styled } from '@material-ui/core/styles'

import MuiSwitch from '@material-ui/core/Switch'


export const Switch = styled(MuiSwitch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  margin: 8,
  display: 'flex',
  '&:hover': {
    '& .MuiSwitch-track': {
      backgroundColor: '#ebf1f5',
    }
  },

  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: theme.palette.common.white,
    border: 'none',
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },

  '& .MuiSwitch-track': {
    // border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#e8ecee',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  },
}))

export default Switch
