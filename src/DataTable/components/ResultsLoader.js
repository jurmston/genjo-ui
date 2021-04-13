import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'

import CircleLoader from '../../CircleLoader'
import useDataTable from '../useDataTable'

const useStyles = makeStyles({
  root: {
    padding: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  linearLoader: {
    height: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
})

const ResultsLoader = ({ isLoading, isFetching, count }) => {
  const { classes } = useDataTable()

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
