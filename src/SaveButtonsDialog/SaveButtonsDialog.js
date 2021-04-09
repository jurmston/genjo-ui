import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

import useDimensions from '../useDimensions'


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    // left: '50%',
    // transform: 'translateX(-50%)',
    width: '100%',
    height: 120,
  },
  card: {
    zIndex: 9999,
    position: 'fixed',
    bottom: 32,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

export const SaveButtonsDialog = ({ isIn = false, onCancel, onSave }) => {
  const classes = useStyles()

  const [ref, dim, ] = useDimensions()

  return (
    <div
      className={classes.root}
      ref={ref}
    >
      <Slide in={isIn} direction="up">
        <div
          className={classes.card}
          style={{ width: dim.width, left: dim.left }}
        >
          <Button onClick={onCancel}>
            Discard Changes
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
          >
            Save Changes
          </Button>
        </div>
      </Slide>
    </div>
  )
}

SaveButtonsDialog.propTypes = {
  isIn: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
}

export default SaveButtonsDialog
