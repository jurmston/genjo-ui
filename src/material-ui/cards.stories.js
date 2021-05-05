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

import ChecklistIcon from '@material-ui/icons/PlaylistAddRounded'


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
          <Card variant="contained">
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
