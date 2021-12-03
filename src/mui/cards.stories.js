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
  title: 'Material-UI/Cards',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div style={{ width: 500 }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Card raised>
            <CardMedia
              style={{ height: 300 }}
              image={mountainsImage}
            />

            <CardHeader
              avatar={
                <ChecklistIcon style={{ fontSize: 28 }} />
              }
              title={
                <Typography variant="h6">
                  Widget Card
                </Typography>
              }
              action={
                <Button variant="contained">
                  + Add
                </Button>
              }
            />

            <CardContent>
              <Typography>Lorem ipsum</Typography>
            </CardContent>

          </Card>
        </Grid>

      </Grid>
    </div>
  )
}
