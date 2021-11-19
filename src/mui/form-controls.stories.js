import React from 'react'

import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'


import Switch from '../Switch'
import Radio from '../Radio'
import Checkbox from '../Checkbox'

export default {
  title: 'Material-UI/FormControls',
}

export const Primary = () => {

  return (
    <div style={{ width: 800 }}>
      <Grid container spacing={2}>

      <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              label="Primary"
              control={<Switch />}
            />

            <FormControlLabel
              label="Secondary"
              control={<Switch color="secondary" />}
            />

            <FormControlLabel
              label="Success"
              control={<Switch color="success" />}
            />

            <FormControlLabel
              label="Info"
              control={<Switch color="info" />}
            />

            <FormControlLabel
              label="Warning"
              control={<Switch color="warning" />}
            />

            <FormControlLabel
              label="Error"
              control={<Switch color="error" />}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              label="Primary"
              control={<Checkbox />}
            />

            <FormControlLabel
              label="Secondary"
              control={<Checkbox color="secondary" />}
            />

            <FormControlLabel
              label="Success"
              control={<Checkbox color="success" />}
            />

            <FormControlLabel
              label="Info"
              control={<Checkbox color="info" />}
            />

            <FormControlLabel
              label="Warning"
              control={<Checkbox color="warning" />}
            />

            <FormControlLabel
              label="Error"
              control={<Checkbox color="error" />}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              label="Primary"
              control={<Checkbox indeterminate />}
            />

            <FormControlLabel
              label="Secondary"
              control={<Checkbox indeterminate color="secondary" />}
            />

            <FormControlLabel
              label="Success"
              control={<Checkbox indeterminate color="success" />}
            />

            <FormControlLabel
              label="Info"
              control={<Checkbox indeterminate color="info" />}
            />

            <FormControlLabel
              label="Warning"
              control={<Checkbox indeterminate color="warning" />}
            />

            <FormControlLabel
              label="Error"
              control={<Checkbox indeterminate color="error" />}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <RadioGroup row>
            <FormControlLabel
              value="primary"
              label="Primary"
              control={<Radio />}
            />

            <FormControlLabel
              value="secondary"
              label="Secondary"
              control={<Radio color="secondary" />}
            />

            <FormControlLabel
              value="success"
              label="Success"
              control={<Radio color="success" />}
            />

            <FormControlLabel
              value="info"
              label="Info"
              control={<Radio color="info" />}
            />

            <FormControlLabel
              value="warning"
              label="Warning"
              control={<Radio color="warning" />}
            />

            <FormControlLabel
              value="error"
              label="Error"
              control={<Radio color="error" />}
            />
          </RadioGroup>
        </Grid>

      </Grid>
    </div>
  )
}
