import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { TextEditor } from './TextEditor'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { DateTime } from 'luxon'

import Message from '../Message'

import getRandomUser from '../../.storybook/utils/getRandomUser'


export default {
  title: 'Widgets/TextEditor',
  component: TextEditor,
}

export const Messages = () => {
  const [messages, setMessages] = React.useState([])

  async function onSave(value) {
    const user = await getRandomUser()

    const message = {
      id: uuid(),
      value: JSON.stringify(value),
      user,
      created: DateTime.now().toISO(),
    }

    setMessages(messages.concat(message))
  }

  return (
    <>
      <TextEditor
        value={null}
        onSave={onSave}
        resetOnSave
      />

      <div style={{ marginBottom: 32 }} />

      <Grid container spacing={2}>
        {messages.map(message => (
          <Grid item xs={12} key={message.id}>
            <Message {...message} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
