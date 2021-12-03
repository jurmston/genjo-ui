import React from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'


export default {
  title: 'Material-UI/Buttons',
}

export const Primary = () => {

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>

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

      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>

        <Grid item>
          <Button color="secondary" startIcon={<AddIcon />}>
            Text Button
          </Button>
        </Grid>

        <Grid item>
          <Button color="secondary" variant="contained" startIcon={<AddIcon />}>
            Contained Button
          </Button>
        </Grid>

        <Grid item>
          <Button color="secondary" variant="outlined" endIcon={<DeleteIcon />}>
            Outlined Button
          </Button>
        </Grid>

        </Grid>

      <Grid container spacing={2}>
        <Grid item>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
