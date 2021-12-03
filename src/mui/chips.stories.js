import React from 'react'

import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import ChecklistIcon from '@mui/icons-material/PlaylistAddRounded'


export default {
  title: 'Material-UI/Chips',
}

export const Primary = () => {

  return (
    <>
    <Typography variant="subtitle2">Material-UI</Typography>
      <Grid container spacing={2}>

        <Grid item>
          <Chip label="Test" clickable />
        </Grid>

        <Grid item>
          <Chip color="primary" label="Test With Icon" icon={<ChecklistIcon />} />
        </Grid>

        <Grid item>
          <Chip color="error" label="Test Deletable" onDelete={() => {}} />
        </Grid>

        <Grid item>
          <Chip label="⌘K" />
        </Grid>
      </Grid>
    </>
  )
}
