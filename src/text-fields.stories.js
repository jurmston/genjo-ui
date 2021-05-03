import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import HelpIcon from '@material-ui/icons/Help'


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
      </Grid>
    </div>
  )
}
