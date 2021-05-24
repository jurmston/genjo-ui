import * as React from 'react'

import { experimentalStyled as styled, darken } from '@material-ui/core/styles'
import MuiRadio from '@material-ui/core/Radio'


const RadioIcon = styled('span')({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
})

const RadioCheckedIcon = styled(RadioIcon)(({ theme }) => ({
  // animation: 'radio-bounce 0.15s 1 ease-in-out',
  backgroundColor: theme.palette.secondary.main,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: darken(theme.palette.secondary.main, 0.05),
  },

}))


export function Radio(props) {
  return (
    <MuiRadio
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<RadioCheckedIcon />}
      icon={<RadioIcon />}
      {...props}
    />
  )
}

export default Radio
