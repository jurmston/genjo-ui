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
import Stack from '@material-ui/core/Stack'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'

import SortableHeader from '../SortableHeader'

import ChecklistIcon from '@material-ui/icons/PlaylistAddRounded'

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
