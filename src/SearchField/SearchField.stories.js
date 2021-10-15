import React from 'react'
import Grid from '@mui/material/Grid'
import { SearchField } from './SearchField'
import { colors, colorsLight } from '../ThemeProvider/colors'

import { StorybookTheme } from '../../.storybook/components/StorybookTheme'

export default {
  title: 'Components/SearchField',
  component: SearchField,
}

export const Primary = () => {
  const [query, setQuery] = React.useState('')

  return (
    <StorybookTheme>
      <Grid container spacing={1} style={{ maxWidth: 400 }}>
        <Grid item xs={12}>
          <SearchField
            label="Search"
            placeholder="Start searching..."
            value={query}
            onChange={setQuery}
            helperText={query}
          />
        </Grid>

        <Grid item xs={12} style={{ alignSelf: 'flex-end' }}>
          <SearchField
            shouldGrowOnFocus
            label="Search"
            placeholder="Start searching..."
            value={query}
            onChange={setQuery}
            helperText={query}
          />
        </Grid>
      </Grid>
    </StorybookTheme>
  )
}
