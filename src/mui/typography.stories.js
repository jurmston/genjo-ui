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

import StatusChip from '../StatusChip'

import mountainsImage from '../media/mountains.jpg'


export default {
  title: 'Material-UI/Typography',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <>
      <Typography variant="h1">h1. Heading 1</Typography>
      <Typography variant="h2">h2. Headline 2</Typography>
      <Typography variant="h3">h3. Headline 3</Typography>
      <Typography variant="h4">h4. Headline 4</Typography>
      <Typography variant="subtitle2">subtitle. Subtitle 2</Typography>
      <Typography variant="body1">p. Body 1</Typography>
    </>
  )
}
