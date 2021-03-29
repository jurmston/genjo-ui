import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'


const useStyles = makeStyles(theme => ({
  listItem: {
    color: props => props.isSelected
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
    position: 'relative',
    paddingLeft: props => props.isSubmenu
      ? 48
      : 16,
    backgroundColor: props => props.isSelected && props.isSubmenu
      ? theme.palette.primary[50]
      : props.isSelected
      ? theme.palette.grey[200]
      : props.isSubmenu
      ? theme.palette.grey[200]
      : 'transparent',
    '&:hover': {
      backgroundColor: props => props.isSelected
      ? theme.palette.grey[300]
      : props.isSubmenu
      ? theme.palette.grey[300]
      : theme.palette.grey[300],
      '&:active': {
        backgroundColor: theme.palette.primary[50],
      },
    },
  },
  listItemIcon: {
    color: props => props.isSelected
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
  },
  /** Styles applied to `CircularProgress`. */
  loader: {
    color: theme.palette.text.secondary,
  },
  arrow: {
    color: props => props.isHovered
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
  },
}))

/**
 * Main menu item.
 */
export const MenuPanelItem = ({
  title,
  icon,
  isLoading = false,
  isSubmenu = false,
  isLast = false,
  isOpen: isOpenFromProps = false,
  isAlwaysOpen = false,
  onClick,
  isSelected,
  children,
  tag = '',
  ...listItemProps
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const classes = useStyles({
    isHovered,
    isSelected,
    isSubmenu,
  })

  const isOpen = isAlwaysOpen || isOpenFromProps

  const submenuItems = React.Children.toArray(children).map(child => {
    if (child.type.displayName !== 'MenuPanelItem') {
      throw new Error('Submenu items must be Menu Item components.')
    }

    if (React.Children.count(child.props.children)) {
      throw new Error('Submenu items cannot have nested submenu items.')
    }

    return child
  })

  return (
    <>
      <ListItem
        dense
        button={!!onClick}
        divider={isOpen || isLast}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={classes.listItem}
        {...listItemProps}
      >
        {(!!icon || isLoading) && !isSubmenu && (
          <ListItemIcon className={classes.listItemIcon}>
            {isLoading ? (
              <CircularProgress
                className={classes.loader}
                size={16}
              />
            ) : icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={tag ? (
            <>
              <span style={{ marginRight: 8 }}>{title}</span>
              <Chip
                size="small"
                label={tag}
                color="primary"
              />
            </>
          ) : title}
          primaryTypographyProps={{
            color: 'inherit',
            display: 'inline',
            component: 'div',
          }}
        />
        {!isAlwaysOpen && submenuItems.length > 0 && (isHovered || isOpen) && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            {isOpen ? (
              <Icon>arrow_downward</Icon>
            ) : (
              <Icon>arrow_forward</Icon>
            )}
          </div>
        )}
      </ListItem>
      {isOpen && submenuItems.map((child, index) => React.cloneElement(
        child,
        {
          isSubmenu: true,
          isLast: index === submenuItems.length - 1,
        }),
        // sub-MenuPanelItem children are not rendered
      )}
    </>
  )
}

MenuPanelItem.propTypes = {
  /** Title of the item */
  title: PropTypes.string.isRequired,
  /** Icon element for the item */
  icon: PropTypes.node,
  /** Handle click event */
  onClick: PropTypes.func,
  /** Is the item selected? */
  isSelected: PropTypes.bool,
  /** Flag if item should be expanded. */
  isOpen: PropTypes.bool,
  /** Flag if item should always be expanded. Mutually exclusive with `isOpen` */
  isAlwaysOpen: PropTypes.bool,
  /** Flag if item should always be expanded */
  isExpanded: PropTypes.bool,
  /** Submenu items if the item is expanding. */
  children: PropTypes.node,
  /** Optional tag that highlights a feature in a menu section. */
  tag: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmenu: PropTypes.bool,
  isLast: PropTypes.bool,
}

MenuPanelItem.displayName = 'MenuPanelItem'

export default MenuPanelItem
