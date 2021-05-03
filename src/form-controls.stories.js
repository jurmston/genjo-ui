import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'

import HelpIcon from '@material-ui/icons/Help'


export default {
  title: 'Material-UI/FormControls',
}

export const Primary = () => {
  const [required, setRequired] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div style={{ width: 300 }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControlLabel
            label="This is a switch!"
            control={<Switch />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label="This is a checkbox!"
            control={<Checkbox />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label="This is a radio!"
            control={<Radio />}
          />
        </Grid>

      </Grid>
    </div>
  )
}
