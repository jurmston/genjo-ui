import React from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import ChecklistIcon from '@material-ui/icons/PlaylistAddRounded'


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
