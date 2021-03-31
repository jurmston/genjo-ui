import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import LinearProgress from '@material-ui/core/LinearProgress'
import { CircleLoader } from '../../CircleLoader'
import { useTable } from '../context'

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  linearLoader: {
    height: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
})

const ResultsLoader = ({ isLoading, isFetching, count }) => {
  const { classes } = useTable()

  if (isLoading) {
    return (
      <Grid container spacing={1} direction="column" alignItems="center" justify="center">
        <div style={{ padding: 32 }}>
          <CircleLoader />
        </div>
      </Grid>
    )
  }

  if (isFetching) {
    return (
      <LinearProgress className={classes.loadingBar} />
    )
  }

  if (!count) {
    return (
      <Grid container spacing={1} direction="column" alignItems="center" justify="center">
        <div style={{ padding: 32 }}>
          <Typography variant="h6" align="center" color="textSecondary" style={{ padding: 32 }}>No Results</Typography>
          </div>
      </Grid>
    )
  }

  return null
}

ResultsLoader.propTypes = {
  isLoading: PropTypes.bool,
  count: PropTypes.number,
}

export { ResultsLoader }
