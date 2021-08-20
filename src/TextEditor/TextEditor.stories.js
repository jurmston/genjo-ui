import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { TextEditor } from './TextEditor'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'

import { DateTime } from 'luxon'

import Message from '../Message'
import ThemeProvider from '../ThemeProvider'

import getRandomUser from '../../.storybook/utils/getRandomUser'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { colors } from '../ThemeProvider/colors'

import { RenderedText } from './RenderedText'


const cache = createCache({
  key: 'css',
  prepend: true,
})

cache.compat = true


export default {
  title: 'Widgets/TextEditor',
  component: TextEditor,
}

export const Messages = () => {
  const [value, setValue] = React.useState()

  const ref = React.useRef()

  return (
    <CacheProvider value={cache}>

      <ThemeProvider theme={{ mode: 'light', primary: colors.indigo, secondary: colors.orange }}>
        <TextEditor
          value={value}
          onChange={setValue}
          minHeight={200}
          maxHeight={200}
        />

        <div style={{ marginBottom: 32 }} />

        <RenderedText
          value={value}
        />
      </ThemeProvider>
    </CacheProvider>
  )
}
