import React from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'

import SortableHeader from '../SortableHeader'
import TableResultsLoader from '../TableResultsLoader'

import axios from 'axios'


export default {
  title: 'Material-UI/Tables',
}

export const Primary = () => {
  const [people, setPeople] = React.useState(null)

  const [sortBy, setSortBy] = React.useState({ value: '', direction: 'asc' })

  const [showNoResults, setShowNoResult] = React.useState(false)

  React.useEffect(
    () => {
      if (showNoResults) {
        return
      }

      (async () => {
        const response = await axios.get('https://randomuser.me/api/?results=25')

        setPeople(response?.data?.results ?? [])
      })()
    },
    [showNoResults]
  )

  React.useEffect(
    () => {
      if (showNoResults) {
        setPeople(null)
      }
    }
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
          {people?.map((person, index) => (
            <TableRow key={index} {...console.log(person)}>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    sx={{ height: 28, width: 28 }}
                    src={person.picture.thumbnail}
                  />
                  <span>
                    {`${person.name.first} ${person.name.last}`}
                  </span>
                </Stack>
              </TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.cell}</TableCell>
              <TableCell>{person.location.country}</TableCell>
            </TableRow>
          ))}

          <TableResultsLoader
            colSpan={4}
            isLoading={showNoResults ? false : people === null}
            count={people?.length ?? 0}
          />
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

      <Button
        onClick={() => setShowNoResult(s => !s)}
      >
        Toggle Results
      </Button>
    </div>
  )
}
