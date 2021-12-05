import React from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useOpenable } from './useOpenable'

export default {
  title: 'Hooks/useOpenable',
}

export const Primary = () => {
  const [isOpen, { open, close, toggle }] = useOpenable()

  return (
    <div style={{ width: 300 }}>
      <Typography variant="h3" color={isOpen ? 'success.main' : 'error.main'} sx={{ mb: 2 }}>
        {isOpen
          ? 'Open for business'
          : 'No soup for you'
        }
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant={isOpen ? 'contained' : 'outlined'} onClick={open}>Open</Button>
        <Button variant={!isOpen ? 'contained' : 'outlined'} onClick={close}>Close</Button>
        <Button onClick={toggle}>Toggle</Button>
      </Stack>
    </div>
  )
}

Primary.args = {
  delay: 250,
}
