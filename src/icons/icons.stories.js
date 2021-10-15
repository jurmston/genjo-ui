import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import * as icons from './index'

export default {
  title: 'Icons/Icons',
}

export const Primary = () => {
  return (
    <Grid container spacing={2}>
      {Object.entries(icons).map(([title, IconComponent]) => (
        <Grid key={title} item xs={3}>
          <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
            <Grid item>
              <IconComponent style={{ fontSize: 32 }} />
            </Grid>

            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
