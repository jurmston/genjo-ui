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
    </>
  )
}
