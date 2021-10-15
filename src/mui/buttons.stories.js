import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import ChecklistIcon from '@mui/icons-material/PlaylistAddRounded'


import mountainsImage from '../media/mountains.jpg'


export default {
  title: 'Material-UI/Buttons',
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
