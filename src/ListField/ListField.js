import * as React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import CloseIcon from '@material-ui/icons/CloseRounded'

import CircleLoader from '../CircleLoader'


const useStyles = makeStyles(theme => ({

  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
  },

  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
  },

  addButton: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
    justifyContent: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))


export const ListField = ({
  items = [],
  label = '',
  icon = null,
  keyProp = 'id',
  readOnly = false,
  renderItem,
  onItemClick,
  onItemDelete,
  onItemAdd,
  noItemText = 'There are no items.',
  isLoading = false,
  isFetching = false,
  addItemText = '+ Add Item',
}) => {

  const classes = useStyles()

  return (
    <List variant="contained">
      {Boolean(label) && (
        <ListItem divider>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              style: {
                fontSize: 18,
                fontWeight: 700,
              },
            }}
          />
        </ListItem>
      )}

      {readOnly && items.length === 0 && !isLoading && (
        <ListItem>
          <ListItemText primary={noItemText} />
        </ListItem>
      )}

      {isLoading && (
        <ListItem className={classes.loader}>
          <CircleLoader />
        </ListItem>
      )}

      {isFetching && !isLoading && (
        <LinearProgress />
      )}

      {!isLoading && items.map((item, index) => (
        <ListItem
          key={item[keyProp]}
          style={{ position: 'relative' }}
          divider={!readOnly || index < items.length - 1}
          button={!readOnly && Boolean(onItemClick)}
          onClick={!readOnly && onItemClick
            ? event => onItemClick(event, item, index)
            : null
          }
        >
          {renderItem(item, index)}

          {!readOnly && Boolean(onItemDelete) && (
            <IconButton
              className={classes.deleteButton}
              onClick={event => {
                event.stopPropagation()
                onItemDelete(event, item, index)
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </ListItem>
      ))}

      {!readOnly && Boolean(onItemAdd) && !isLoading && (
        <ListItem
          className={classes.addButton}
          onClick={onItemAdd}
          button
        >
          {addItemText}
        </ListItem>
      )}
    </List>
  )
}

ListField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.string,
  keyProp: PropTypes.string,
  readOnly: PropTypes.bool,
  renderItem: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemDelete: PropTypes.func,
  onItemAdd: PropTypes.func,
  noItemText: PropTypes.string,
  isLoading: PropTypes.bool,
  addItemText: PropTypes.string,
}

export default ListField
