import React from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import TextFieldsIcon from '@material-ui/icons/TextFields'

import { titleCase } from './text'

export default {
  title: 'Utilities/TitleCase',
}

export const Primary = () => {
  const [value, setValue] = React.useState('')

  function applyTitleCase() {
    const newValue = titleCase({
      value,
      prefixes: ['De', 'Mac', 'Mc'],
      uppers: ['NASA', 'IBM', 'USA', 'US', 'UK', 'EU', 'OK', 'GIF', 'GIS', 'ASAP'],
      lowers: ['de', 'the', 'to', 'a', 'an', 'and'],
    })

    setValue(newValue)
  }

  return (
    <TextField
      label="Title Case"
      value={value}
      onChange={event => setValue(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={applyTitleCase}>
              <TextFieldsIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
