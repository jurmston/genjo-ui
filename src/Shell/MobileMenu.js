import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  closeButtonContainer: {
    width: '100%',
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    height: 36,
    width: 36,
  },
  closeIcon: {
    fontSize: 32,
  },
})

const MobileMenu = ({ menuContent, isOpen, close }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullScreen
      fullWidth
    >
      <div className={classes.closeButtonContainer}>
        <IconButton onClick={close} className={classes.closeButton}>
          <Icon className={classes.closeIcon}>close</Icon>
        </IconButton>
      </div>
      {menuContent}
    </Dialog>
  )
}

MobileMenu.propTypes = {
  menuContent: PropTypes.node,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
}

export { MobileMenu }
