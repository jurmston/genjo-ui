import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CircleLoader from 'genjo-ui/core/CircleLoader'

const useStyles = makeStyles({
  container: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const TableResultsLoader = ({
  colSpan = 1,
  isLoading,
  count = 0,
  children = 'No Results',
}) => {
  const classes = useStyles()

  if (!isLoading && count) {
    return null
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={classes.root}>
        <div className={classes.container}>
          {isLoading ? (
            <CircleLoader />
          ) : typeof children === 'string' ? (
            <Typography variant="h6" color="textSecondary">{children}</Typography>
          ) : children}
        </div>
      </TableCell>
    </TableRow>
  )
}

TableResultsLoader.propTypes = {
  /** If `true` the loading circle will appear. */
  isLoading: PropTypes.bool,
  /** The number of records in the results. */
  count: PropTypes.number,
  /** The number of columns in the table. */
  colSpan: PropTypes.number,
  /** Content to render when the loaded count is zero. */
  children: PropTypes.node,
}
