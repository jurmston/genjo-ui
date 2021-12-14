import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ToggleButton from '@mui/material/ToggleButton'
import Stack from '@mui/material/Stack'

import HelpIcon from '@mui/icons-material/Help'

import AddOn, { AddOnButton, AddOnLabel } from '../AddOn'

export default {
  title: 'Material-UI/TextFields',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div style={{ width: 550 }}>
      <Grid container spacing={1}>
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

      <Grid container spacing={1}>

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

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Label"
            variant="standard"
            helperText="This text helps."
            placeholder="Give me string..."
            InputProps={{
              startAdornment: (
                <AddOn position="start">
                  $
                </AddOn>
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
            id={null}
            variant="outlined"
            helperText="This text helps."
            placeholder="Give me string..."
            InputProps={{
              startAdornment: (
                <AddOnLabel position="start">Name</AddOnLabel>
              ),

              endAdornment: (
                <AddOnButton position="end">
                  Click Me
                </AddOnButton>
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

            <TextField
              label="Label"
              helperText="This text helps."
              error={error}
              placeholder="Give me string..."
              required={required}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="1">Item 1</option>
              <option value="2">Item 2</option>
              <option value="3">Item 3</option>
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

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={4}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['White Christmas', 'The Godfather', 'Fifth Element']}
            fullWidth
            renderInput={(params) => <TextField {...params} placeholder="Autocomplete" />}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            placeholder="Regular field..."
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
      </Grid>


      <div style={{ marginBottom: 400 }} />
    </div>
  )
}
