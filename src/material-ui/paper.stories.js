import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default {
  title: 'Material-UI/Paper',
}


const ELEVATIONS = [0, 1, 2, 4, 8, 24]


export const Primary = () => {

  return (
    <div style={{ maxWidth: 600 }}>
      <Grid container spacing={2}>
        {ELEVATIONS.map(value => (
          <Grid key={value} item xs={12} sm={6}>
            <Paper
              elevation={value}
              style={{
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>
                {`Elevation = ${value}`}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
