import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

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
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" component="div">
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
