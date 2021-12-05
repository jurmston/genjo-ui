import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import CircleLoader from '../CircleLoader'

export const TableResultsLoader = ({
  colSpan = 1,
  isLoading,
  count = 0,
  children = 'No Results',
}) => {
  if (!isLoading && count) {
    return null
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box
          sx={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <CircleLoader />
          ) : typeof children === 'string' ? (
            <Typography variant="h4" color="textSecondary">{children}</Typography>
          ) : children}
        </Box>
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
