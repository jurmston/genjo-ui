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
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'

import SortableHeader from '../SortableHeader'

import ChecklistIcon from '@mui/icons-material/PlaylistAddRounded'

import axios from 'axios'


export default {
  title: 'Material-UI/Tables',
}

export const Primary = () => {
  const [people, setPeople] = React.useState([])

  const [sortBy, setSortBy] = React.useState({ value: '', direction: 'asc' })

  console.log(sortBy)

  React.useEffect(
    () => {
      (async () => {
        const response = await axios.get('https://randomuser.me/api/?results=25')

        setPeople(response?.data?.results ?? [])
      })()
    },
    []
  )

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <SortableHeader
                sortingKey="name"
                onClick={(event, value, direction) => setSortBy({ value, direction })}
                {...sortBy}
              >
                Name
              </SortableHeader>
            </TableCell>
            <TableCell>
              <SortableHeader
                sortingKey="email"
                onClick={(event, value, direction) => setSortBy({ value, direction })}
                {...sortBy}
              >
                Email
              </SortableHeader>
            </TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {people.map((person, index) => (
            <TableRow key={index}>
              <TableCell>{`${person.firstName} ${person.lastName}`}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.cell}</TableCell>
              <TableCell>{person.location.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <span>25 records</span>
                <div style={{ flex: 1 }} />
                <Button variant="white">
                  Previous
                </Button>

                <Button variant="white">
                  Next
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
