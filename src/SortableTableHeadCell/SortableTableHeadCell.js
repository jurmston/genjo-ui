import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

import SortAlphaIcon from '../icons/SortAlphaIcon'
import SortAlphaAscendingIcon from '../icons/SortAlphaAscendingIcon'
import SortAlphaDescendingIcon from '../icons/SortAlphaDescendingIcon'
import SortNumberIcon from '../icons/SortNumberIcon'
import SortNumberAscendingIcon from '../icons/SortNumberAscendingIcon'
import SortNumberDescendingIcon from '../icons/SortNumberDescendingIcon'
import SortGenericIcon from '../icons/SortGenericIcon'
import SortGenericAscendingIcon from '../icons/SortGenericAscendingIcon'
import SortGenericDescendingIcon from '../icons/SortGenericDescendingIcon'

const useStyles = makeStyles(theme => ({
  head: {
    cursor: 'pointer',
    padding: 2,
  },
  isSelected: {
    color: theme.palette.primary.main,
  },
  wrapper: {
    padding: 2,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  iconButton: {
    height: 22,
    width: 22,
  },
  icon: {
    fontSize: 18,
  }
}))

const ALPHA = 'alpha'
const NUMBER = 'number'
const GENERIC = 'generic'
const ASC = 'asc'
const DESC = 'desc'

/** Get the icon component given sort type and direction. */
function getSortIcon(isSelected, type, direction) {
  if (type === ALPHA) {
    return !isSelected
      ? SortAlphaIcon
      : direction === ASC
      ? SortAlphaAscendingIcon
      : SortAlphaDescendingIcon
  }

  if (type === DESC) {
    return !isSelected
      ? SortNumberIcon
      : direction === ASC
      ? SortNumberAscendingIcon
      : SortNumberDescendingIcon
  }

  return !isSelected
    ? SortGenericIcon
    : direction === ASC
    ? SortGenericAscendingIcon
    : SortGenericDescendingIcon
}

export const SortableTableHeadCell = ({
  onClick,
  label,
  isSelected = false,
  type = GENERIC,
  direction = ASC,
  ...tableCellProps
}) => {
  const classes = useStyles()

  const IconComponent = getSortIcon(isSelected, type, direction)

  return (
    <TableCell
      {...tableCellProps}
      className={clsx(
        classes.head,
        isSelected && classes.isSelected,
      )}
      onClick={onClick}

    >
      <Grid container wrap="nowrap" className={classes.wrapper}>
        <Grid item>{label}</Grid>
        <Grid item>
          <IconButton
            className={classes.icon}
            color={isSelected ? 'primary' : 'default'}
            onClick={onClick}
          >
            <IconComponent className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  )
}

SortableTableHeadCell.propTypes = {
  type: PropTypes.oneOf([ALPHA, NUMBER, GENERIC]),
  direction: PropTypes.oneOf([ASC, DESC]),
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}
