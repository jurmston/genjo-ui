import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CircleLoader } from '../CircleLoader/CircleLoader'

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const MenuPanelLoader = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CircleLoader size={64} />
    </div>
  )
}

export default MenuPanelLoader
