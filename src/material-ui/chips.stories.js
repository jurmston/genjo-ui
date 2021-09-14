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


import { colors } from '../ThemeProvider'

import StatusChip from '../StatusChip'

import mountainsImage from '../media/mountains.jpg'


export default {
  title: 'Material-UI/Chips',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <>
    <Typography variant="subtitle2">Material-UI</Typography>
      <Grid container spacing={2}>

        <Grid item>
          <Chip label="Test" />
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

      <div style={{ marginTop: 32 }} />

      <Typography variant="subtitle2">Genjo Status Chip with Palette Colors</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <StatusChip label="Default" />
        </Grid>

        <Grid item>
          <StatusChip label="Primary" color="primary" />
        </Grid>

        <Grid item>
          <StatusChip label="Secondary" color="secondary" />
        </Grid>

        <Grid item>
          <StatusChip label="Success" color="success" />
        </Grid>

        <Grid item>
          <StatusChip label="Warning" color="warning" />
        </Grid>

        <Grid item>
          <StatusChip label="Error" color="error" />
        </Grid>

        <Grid item>
          <StatusChip label="Info" color="info" />
        </Grid>

      </Grid>

      <Typography variant="subtitle2">Genjo Status Chip with Custom Colors</Typography>
      <Grid container spacing={2}>
        {Object.keys(colors).filter(name => name !== 'common').map(name => (
          <Grid item key={name}>
            <StatusChip label={name} color={name} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
