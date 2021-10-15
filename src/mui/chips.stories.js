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
