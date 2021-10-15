import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  closeButton: {
    color: theme.palette.text.secondary,
  },
}))

/**
 * A dyanmic content panel that opens on the right side of the viewport.
 */
export const ClosableDialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles()

  return (
    <DialogTitle className={classes.root} {...other}>
      <Typography variant="h2" component="div">
        {children}
      </Typography>
      {onClose ? (
        <div className={classes.closeButtonContainer}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </DialogTitle>
  )
}

ClosableDialogTitle.propTypes = {
  /** The content of the ClosableDialogTitle. */
  children: PropTypes.node.isRequired,
  /**
   * Callback for closing the ClosableDialogTitle.
   *
   * @param {object} event Source event for the onClick callback.
   */
  onClose: PropTypes.func.isRequired,
}

export default ClosableDialogTitle
