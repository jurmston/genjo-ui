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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ChecklistIcon from '@material-ui/icons/PlaylistAddRounded'

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
