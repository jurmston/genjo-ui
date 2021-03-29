import * as React from 'react'

import { experimentalStyled } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'


export const ButtonTab = experimentalStyled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    '&:hover': {
      opacity: 1
    },
    minHeight: 44,
    minWidth: 96,
    [theme.breakpoints.up('md')]: {
      minWidth: 120
    }
  },
  '& .MuiTab-wrapper': {
    // zIndex: 2,
    // marginTop: spacing(0.5),
    color: theme.palette.text.primary,
    textTransform: 'initial'
  },
}))
