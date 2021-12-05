import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useDimensions } from './useDimensions'



export default {
  title: 'Hooks/useDimensions',
  component: useDimensions,
}


const dimesionItems = [
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'top', label: 'Top' },
  { key: 'right', label: 'Right' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
  { key: 'x', label: 'X' },
  { key: 'y', label: 'Y' },
]


export const Primary = () => {
  const [ref, dim, element] = useDimensions()

  console.log(element?.attributes)

  return (
    <Card
      ref={ref}
      sx={{
        width: 1,
      }}
    >
      <CardContent>
        <Typography variant="h3">
          useDimensions
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <List>
              {dimesionItems.map(item => (
                <ListItem key={dim.key}>
                  <ListItemText
                    primary={dim[item.key]}
                    secondary={item.label}
                  />
                </ListItem>
              ))}

            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Element
            </Typography>

            <Typography variant="caption">
              {element?.tagName ?? ''}
              {element?.attributes?.class?.nodeValue ?? ''}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
