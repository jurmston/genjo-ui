import React from 'react'

import Grid from '@mui/material/Grid'
import { Button } from './Button'

import './main.css'

export default {
  title: 'Simple/Buttons',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <Grid container spacing={2}>

      <Grid item>
        <Button>
          Text Button
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained">
          Contained Button
        </Button>
      </Grid>

      <Grid item>
        <Button variant="outlined">
          Outlined Button
        </Button>
      </Grid>

      <Grid item>
        <Button variant="white">
          White Button
        </Button>
      </Grid>

    </Grid>
  )
}
