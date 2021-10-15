import React from 'react'

import Grid from '@mui/material/Grid'

import { CircleLoader } from './CircleLoader'

export default {
  title: 'Components/CircleLoader',
  component: CircleLoader,
}

export const Primary = () => {
  return (
    <Grid container spacing={2}>

      <Grid item>
        <CircleLoader />
      </Grid>

      <Grid item>
        <CircleLoader size={28} />
      </Grid>

      {/*
        This example tests that the outer div stays at the specified size even
        if the parent container has a larger width.
      */}
      <Grid item style={{ width: 180 }}>
        <CircleLoader size={16} />
      </Grid>

    </Grid>

  )
}
