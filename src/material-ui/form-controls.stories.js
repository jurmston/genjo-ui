import React from 'react'

import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'


import Switch from '../Switch'
import Radio from '../Radio'
import Checkbox from '../Checkbox'

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
