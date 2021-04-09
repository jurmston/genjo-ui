import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

/* From
https://codepen.io/danielmorosan/pen/XmYBVx
Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
const useStyles = makeStyles(theme => ({
  ball: {
    backgroundColor: props =>
      props.variant === 'primary'
        ? theme.palette.primary.main
        : props.variant === 'secondary'
        ? theme.palette.secondary.main
        : theme.palette.grey[500],
  },
  bounce1: {},
  bounce2: {},
  bounce3: {},
  spinner: {
    width: props => props.width,
    textAlign: 'center',
    height: props => props.width * 0.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& div': {
      width: props => props.width * 0.25,
      height: props => props.width * 0.25,
      margin: 'auto 0',
      borderRadius: '100%',
      display: 'inline-block',
      animation: '$sk-bouncedelay 1.4s infinite ease-in-out both',
      '&$bounce1': {
        animationDelay: '-0.32s',
      },
      '&$bounce2': {
        animationDelay: '-0.16s',
      },
    },
  },
  '@keyframes sk-bouncedelay': {
    '0%, 80%, 100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1.0)',
    },
  },
}))

/**
 * Loading component to display on non full page content
 */
export const MiniLoader = ({ width = 40, variant = 'default', ...props }) => {
  const classes = useStyles({ variant, width })

  return (
    <div className={classes.spinner} {...props}>
      <div className={clsx(classes.ball, classes.bounce1)} />
      <div className={clsx(classes.ball, classes.bounce2)} />
      <div className={clsx(classes.ball, classes.bounce3)} />
    </div>
  )
}

MiniLoader.propTypes = {
  /** The width of the container. */
  width: PropTypes.number,
  /** Color variant of the loader. */
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
}

export default MiniLoader
