import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import ToggleButton from '@mui/material/ToggleButton'
import Stack from '@mui/material/Stack'

import HelpIcon from '@mui/icons-material/Help'


export default {
  title: 'Material-UI/TextFields',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div style={{ width: 300 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setRequired(!required)}
          >
            {`Required: ${required ? 'Yes' : 'No'}`}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => setError(!error)}
          >
            {`Error: ${error ? 'Yes' : 'No'}`}
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6">Simple</Typography>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required={required}
            error={error}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required={required}
            error={error}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="filled"
            required={required}
            error={error}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="filled"
            required={required}
            error={error}
            multiline
            minRows={5}
            maxRows={10}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: 32 }} />

      <Typography variant="h6">Everything Bagel</Typography>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TextField
            label="Label"
            variant="standard"
            helperText="This text helps."
            placeholder="Give me string..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            required={required}
            error={error}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Label"
            helperText="This text helps."
            placeholder="Give me string..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            required={required}
            error={error}
          />
        </Grid>

        <Grid item xs={12}>

            <TextField
              variant="filled"
              label="Label"
              helperText="This text helps."
              error={error}
              placeholder="Give me string..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
              required={required}
              select
            >
              <MenuItem value="1">Item 1</MenuItem>
              <MenuItem value="2">Item 2</MenuItem>
              <MenuItem value="3">Item 3</MenuItem>
            </TextField>


        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>

            <TextField
              variant="filled"
              placeholder="With help..."
            />

            <ToggleButton variant="filled">
              <HelpIcon />
            </ToggleButton>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
