import React from 'react'

import randomWords from 'random-words'

import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import { ListField } from './ListField'

import { v4 as uuid } from 'uuid'

import { titleCase } from '../utils/text'

import TaskAltIcon from '@material-ui/icons/TaskAltRounded'


export default {
  title: 'Components/ListField',
  component: ListField,
}

export const Primary = () => {
  const [items, setItems] = React.useState([])

  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(false)
  const [readOnly, setReadOnly] = React.useState(false)

  function createItem() {
    setItems(items.concat({
      id: uuid(),
      name: titleCase({ value: randomWords(3).join(' ') }),
      category: titleCase({ value: randomWords(1).join(' ') }),
    }))
  }

  function deleteItem(event, itemToDelete) {
    setItems(items.filter(item => item.id !== itemToDelete.id))
  }

  return (
    <div style={{ width: 300 }}>
      <ListField
        readOnly={readOnly}
        label="List Field"
        icon={<TaskAltIcon />}
        items={items}
        onItemAdd={createItem}
        onItemClick={() => {}}
        onItemDelete={deleteItem}
        renderItem={(item) => (
          <ListItemText
            primary={item.name}
            secondary={item.category}
          />
        )}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <div style={{ marginTop: 32 }} />

      <Button
        variant={isLoading ? 'contained' : 'standard'}
        onClick={() => setIsLoading(!isLoading)}
      >
        Loading
      </Button>

      <Button
        variant={isFetching ? 'contained' : 'standard'}
        onClick={() => setIsFetching(!isFetching)}
      >
        Fetching
      </Button>

      <div style={{ marginRight: 16 }} />

      <Button
        variant={readOnly ? 'contained' : 'standard'}
        onClick={() => setReadOnly(!readOnly)}
      >
        Read Only
      </Button>
    </div>
  )
}
