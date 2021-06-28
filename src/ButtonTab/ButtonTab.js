import * as React from 'react'
// import { makeStyles } from '@material-ui/styles'
import Tab from '@material-ui/core/Tab'

import { styled } from '@material-ui/core/styles'


// const useStyles = makeStyles(theme => ({
//   root: {
//     '&:hover': {
//       opacity: 1,
//     },
//     minHeight: 'unset',
//     minWidth: 96,
//     [theme.breakpoints.up('md')]: {
//       minWidth: 120,
//     },
//   },
//   wrapper: {
//     // zIndex: 2,
//     // marginTop: spacing(0.5),
//     textTransform: 'initial',
//   },
// }))

export const ButtonTab = styled(Tab)(({ theme }) => ({
  '&:hover': {
    opacity: 1,
  },
  minHeight: 'unset',
  minWidth: 96,
  [theme.breakpoints.up('md')]: {
    minWidth: 120,
  },

  '& .MuiTab-wrapper': {
    // zIndex: 2,
    // marginTop: spacing(0.5),
    textTransform: 'initial',
  },
}))

export default ButtonTab
