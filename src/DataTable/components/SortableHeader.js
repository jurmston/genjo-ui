import React from 'react'
import PropTypes from 'prop-types'
// import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import SortAlphaIcon from '../../icons/SortAlphaIcon'
import SortAlphaAscendingIcon from '../../icons/SortAlphaAscendingIcon'
import SortAlphaDescendingIcon from '../../icons/SortAlphaDescendingIcon'
import SortNumberIcon from '../../icons/SortNumberIcon'
import SortNumberAscendingIcon from '../../icons/SortNumberAscendingIcon'
import SortNumberDescendingIcon from '../../icons/SortNumberDescendingIcon'
import SortGenericIcon from '../../icons/SortGenericIcon'
import SortGenericAscendingIcon from '../../icons/SortGenericAscendingIcon'
import SortGenericDescendingIcon from '../../icons/SortGenericDescendingIcon'
import { colors } from '../../styles'

const useStyles = makeStyles(theme => ({
  head: {
    cursor: 'pointer',
    padding: 2,
  },
  isSelected: {
    color: theme.palette.primary.main,
  },
  divider: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
    color: colors.blueGrey[400],
    '&$isSelected': {
      color: theme.palette.primary.main,
    },
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

const SortableHeader = ({
  children,
  type,
  isSelected,
  direction,
  onClick,
}) => {
  const classes = useStyles()

  const IconComponent = getSortIcon(isSelected, type, direction)

  return (
    <Grid container wrap="nowrap" className={classes.wrapper} onClick={onClick}>
      <Grid item>{children}</Grid>
      <Grid item>
        <IconButton
          style={{
            height: 22,
            width: 22,
          }}
          className={clsx(classes.iconButton, isSelected && classes.isSelected)}
          onClick={onClick}
        >
          <IconComponent style={{ fontSize: 18 }} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

SortableHeader.propTypes = {
  /** Flag to indicate if cell is in the table header. */
  isHeader: PropTypes.bool,
  /** Flag to indicate if cell has right-side divider. */
  hasDivider: PropTypes.bool,
  /** Content of the cell. */
  children: PropTypes.node,
  type: PropTypes.oneOf([ALPHA, NUMBER, GENERIC]),
  direction: PropTypes.oneOf([ASC, DESC]),
}

SortableHeader.defaultProps = {
  isHeader: false,
  hasDivider: false,
  type: GENERIC,
  direction: ASC,
}

export { SortableHeader }
