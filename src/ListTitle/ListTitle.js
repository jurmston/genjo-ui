import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    paddingBottom: props => props.disablePadding ? 4 : 12,
    // Adds a margin to match the list's default padding-bottom.
    marginBottom: props => props.disablePadding ? 0 : 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  icon: {
    fontSize: 28,
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
  },
})


export const ListTitle = ({
  title,
  icon: iconFromProps,
  action,
  disablePadding = false,
  ...listItemProps
}) => {

  const classes = useStyles({ disablePadding })

  const icon = iconFromProps
    ? React.cloneElement(iconFromProps, { className: classes.icon })
    : null

  return (
    <ListItem
      {...listItemProps}
      className={clsx(classes.root, listItemProps?.className)}
    >

      {icon}

      <ListItemText>
        <Typography className={classes.title}>
          {title}
        </Typography>
      </ListItemText>

      {action}

    </ListItem>
  )
}

ListTitle.propTypes = {
  /** Placeholder for action components. */
  action: PropTypes.node,
  /**
   * If `false` the padding on the bottom is increased to match the default
   * `List` padding.
   */
  disablePadding: PropTypes.bool,
  /** Optional icon node. */
  icon: PropTypes.node,
  /** Title of the component. */
  title: PropTypes.string,
}

export default ListTitle
