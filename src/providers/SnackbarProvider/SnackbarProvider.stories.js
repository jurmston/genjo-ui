import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { SnackbarProvider, useSnackbar } from './SnackbarProvider'

export default {
  title: 'Providers/SnackbarProvider',
  component: SnackbarProvider,
}


const TriggerSnackbarButtons = () => {
  const snackbar = useSnackbar()

  function trigger(type) {
    snackbar.add({
      value: 'This is a snackbar message.',
      type,
    })
  }

  return (
    <Grid container spacing={1}>

      <Grid item>
        <Button variant="contained" color="primary" onClick={() => trigger('info')}>
          Info
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" onClick={() => trigger('success')}>
          Success
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" onClick={() => trigger('warning')}>
          Warning
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" onClick={() => trigger('error')}>
          Error
        </Button>
      </Grid>

    </Grid>
  )
}


export const Main = () => {

  return (
    <SnackbarProvider>
      <TriggerSnackbarButtons />
    </SnackbarProvider>
  )
}
