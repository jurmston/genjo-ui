import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700],
  },
  top: {
    color: theme.palette.primary.main,
    animationDuration: '1200ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}))

export function CircleLoader(props) {
  const classes = useStyles()

  const { className, size = 40, ...restProps } = props

  return (
    <div
      className={clsx(classes.root, className)}
      style={{ width: size, height: size }}
    >
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={size}
        thickness={4}
        {...restProps}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        thickness={4}
        {...restProps}
      />
    </div>
  )
}

CircleLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
}

export default CircleLoader
