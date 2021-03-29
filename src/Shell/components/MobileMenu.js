import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

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
