import * as React from 'react'

import { styled, darken } from '@material-ui/core/styles'

import MuiCheckbox from '@material-ui/core/Checkbox'


const CheckboxIcon = styled('span')({
  borderRadius: 3,
  width: 16,
  height: 16,
  minWidth: 16,
  maxHeight: 16,
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


const CheckboxCheckedIcon = styled(CheckboxIcon)(({ theme }) => ({
  animation: 'checkbox-bounce 0.15s 1 ease-in-out',
  backgroundColor: theme.palette.secondary.main,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: darken(theme.palette.secondary.main, 0.05),
  },

}))


export function Checkbox(props) {
  return (
    <MuiCheckbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
        '@keyframes checkbox-bounce': {
          '0%': {
            transform: 'scale(0)',
          },
          '75%': {
            transform: 'scale(1.25)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckboxCheckedIcon />}
      icon={<CheckboxIcon />}
      {...props}
    />
  )
}

export default Checkbox
