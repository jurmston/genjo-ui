import React from 'react'

import { Message } from './Message'
import { colors } from '../styles/colors'
import { DateTime } from 'luxon'

import getRandomUser from '../../.storybook/utils/getRandomUser'


export default {
  title: 'Components/Message',
  component: Message,
}

const demoValue = '[{"type":"paragraph","children":[{"text":"This is a demo "},{"text":"message","bold":true},{"text":" with some cool "},{"text":"formatting! And links ","italic":true},{"type":"link","url":"www.example.com","children":[{"italic":true,"text":"click me"}]},{"text":""}]}]'


export const Primary = () => {
  const [user, setUser] = React.useState(null)

  const created = DateTime.now().minus({ days: Math.random() * 5 })

  React.useEffect(
    () => {
      (async () => {
        const user = await getRandomUser()
        console.log({ user })
        setUser(user)
      })()
    },
    []
  )

  return (
    <Message
      value={demoValue}
      user={user}
      created={created.toISO()}
    />
  )
}
