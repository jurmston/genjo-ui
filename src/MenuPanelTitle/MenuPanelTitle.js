import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  /** Styles applied to the `primary` class for the `ListItemText` element. */
  primary: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
  },
}))

/**
 * Title for a menu panel.
 */
export const MenuPanelTitle = ({ avatar, subtitle, title }) => {
  const classes = useStyles()

  return (
    <ListItem>
      {!!avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
      <ListItemText
        primary={title}
        secondary={subtitle}
        classes={{
          primary: classes.primary,
          secondary: classes.secondary,
        }}
      />
    </ListItem>
  )
}

MenuPanelTitle.propTypes = {
  /** Optional avatar to display. */
  avatar: PropTypes.node,
  /** The value of the subtitle string. */
  subtitle: PropTypes.string,
  /** The value of the title string. */
  title: PropTypes.string.isRequired,
}

export default MenuPanelTitle
