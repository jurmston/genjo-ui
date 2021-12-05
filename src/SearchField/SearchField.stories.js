import React from 'react'
import Grid from '@mui/material/Grid'
import { SearchField } from './SearchField'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

export default {
  title: 'Components/SearchField',
  component: SearchField,
}

export const Primary = () => {
  const [queries, setQueries] = React.useState([])

  const handleSearch = React.useCallback(
    query => {
      setQueries(q => query ? [...q, query] : [])
    },
    [],
  )

  return (
    <StorybookTheme>
      <Grid container spacing={1} style={{ width: 500 }}>
        <Grid item xs={12}>
          <SearchField
            label="Search"
            placeholder="Start searching..."
            onSearch={handleSearch}
            shouldGrowOnFocus
          />
        </Grid>

        <Grid item xs={12} style={{ alignSelf: 'flex-end' }}>
          <ul>
            {queries.length === 0 && <li>No queries yet.</li>}
            {queries.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </StorybookTheme>
  )
}
