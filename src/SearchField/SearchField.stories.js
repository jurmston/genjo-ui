import React from 'react'

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
      <div style={{ maxWidth: 300 }}>
        <SearchField
          label="Search"
          placeholder="Start searching..."
          value={query}
          onChange={setQuery}
          helperText={query}
        />
      </div>
    </StorybookTheme>
  )
}
