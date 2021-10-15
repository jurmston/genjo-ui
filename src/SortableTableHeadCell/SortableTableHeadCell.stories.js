import React from 'react'

import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { SortableTableHeadCell } from './SortableTableHeadCell'

export default {
  title: 'Components/SortableTableHeadCell',
  component: SortableTableHeadCell,
}

const ROWS = [
  ['Bob', 23, 'Cheese and Crackers', '06/17/1981'],
  ['Dakota', 26, 'Pizza with Gravy', '05/22/2005'],
  ['Swarguile', 17, 'Beer', '12/31/1999'],
  ['Argola', 34, 'Lima Beans', '07/08/2003'],
]

const KEYS = {
  name:  0,
  age: 1,
  food: 2,
  bear: 3,
}

export const Primary = () => {
  const [sortBy, setSortBy] = React.useState({
    direction: 'asc',
    key: '',
  })

  function handleKeyChange(newKey) {
    setSortBy({
      key: newKey,
      direction: sortBy.key !== newKey
        ? 'asc'
        : sortBy.direction === 'asc'
        ? 'desc'
        : 'asc'
    })
  }

  const sortIndex = KEYS[sortBy.key] ?? -1

  ROWS.sort((a, b) => {
    if (sortIndex === -1) {
      return 0
    }

    if (a[sortIndex] < b[sortIndex]) {
      return sortBy.direction === 'asc' ? -1 : 1
    }

    if (a[sortIndex] > b[sortIndex]) {
      return sortBy.direction === 'asc' ? 1 : -1
    }

    return 0
  })

  return (
    <div style={{ maxWidth: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            <SortableTableHeadCell
              type="alpha"
              onClick={() => handleKeyChange('name')}
              isSelected={sortBy.key === 'name'}
              direction={sortBy.direction}
              label="Name"
            />

            <SortableTableHeadCell
              type="number"
              onClick={() => handleKeyChange('age')}
              isSelected={sortBy.key === 'age'}
              direction={sortBy.direction}
              label="Age"
            />

            <SortableTableHeadCell
              type="alpha"
              onClick={() => handleKeyChange('food')}
              isSelected={sortBy.key === 'food'}
              direction={sortBy.direction}
              label="Favorite Food"
            />

            <SortableTableHeadCell
              onClick={() => handleKeyChange('bear')}
              isSelected={sortBy.key === 'bear'}
              direction={sortBy.direction}
              label="Last Bear Sighting"
            />
          </TableRow>
        </TableHead>

        <TableBody>
          {ROWS.map((row, index) => (
            <TableRow key={index} selected={index === 2}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
