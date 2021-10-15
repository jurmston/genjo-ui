import React from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import TextFieldsIcon from '@mui/icons-material/TextFields'

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
