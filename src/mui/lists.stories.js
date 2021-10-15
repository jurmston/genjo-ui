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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import ChecklistIcon from '@mui/icons-material/PlaylistAddRounded'

import mountainsImage from '../media/mountains.jpg'

import ListTitle from '../ListTitle'
import Spacer from '../Spacer'

export default {
  title: 'Material-UI/Lists',
}

const SONGS = [
  ['Pyxis', 'Home'],
  ['Red Eyes', 'Zombie Hyperdrive'],
  ['The General', 'Dispatch'],
  ['Tamacun', 'Rodrigo y Gabriela'],
  ['New Slang', 'The Shins'],
]

export const Primary = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div style={{ width: 300 }}>
      <List>
        <ListTitle
          title="My Playlist"
          icon={<ChecklistIcon />}
          action={<Button variant="contained">+ Add</Button>}
          divider
          isLoading={isLoading}
        />

        {SONGS.map(([song, artist]) => (
          <ListItem key={song}>
            <ListItemText primary={song} secondary={artist} />
          </ListItem>
        ))}
      </List>

      <Spacer axis="vertical" size={32} />

      <Button
        variant="contained"
        onClick={() => setIsLoading(!isLoading)}
      >
        {isLoading ? 'Loading: ON' : 'Loading: OFF'}
      </Button>
    </div>
  )
}
