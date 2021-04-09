import React from 'react'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import randomWords from 'random-words'

import { useValues } from './useValues'

export default {
  title: 'Hooks/useValues',
}

function getInitialValues() {
  return {
    name: randomWords(1),
    description: randomWords(5).join(' '),
  }
}

export const Primary = () => {
  const [initialValues, setInitialValues] = React.useState({
    name: 'Bob',
    description: 'Monkeys',
  })

  const { values, setFieldValue, resetValues, isDirty } = useValues(initialValues)

  function saveValues() {
    setInitialValues(values)
  }

  return (
    <div style={{ width: 300 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" value={values.name} onChange={event => setFieldValue('name', event.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            value={values.description}
            onChange={event => setFieldValue('description', event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Button disabled={!isDirty} variant="contained" onClick={() => resetValues()}>
                Reset
              </Button>
            </Grid>

            <Grid item>
              <Button disabled={!isDirty} variant="contained" onClick={() => saveValues()}>
                Save
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={() => setInitialValues(getInitialValues())}>
                Get new initial values
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
