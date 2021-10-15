import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import SnackbarProvider from './SnackbarProvider'
import useSnackbar from './useSnackbar'

export default {
  title: 'Providers/SnackbarProvider',
  component: SnackbarProvider,
}

const TEST_MESSAGES = [
  "Why can't a bicycle stand on its own? It's two-tired.",
  "A burger walks into a bar. The bartender says 'Sorry, we don't serve food here'",
  "I'm reading a book about anti-gravity. I can't put it down.",
  'Where do generals keep their armies? In their sleevies!',
  'Orion’s Belt is a huge waist of space.',
  'I was up all night wondering where the sun went, but then it dawned on me.',
  "What's brown and sticky? A stick.",
  "Don't trust atoms. They make up everything!",
  'Did you hear about the scientist who was lab partners with a pot of boiling water? He had a very esteemed colleague.',
]

function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * TEST_MESSAGES.length)
  return TEST_MESSAGES[randomIndex]
}

const TriggerSnackbarButtons = () => {
  const snackbar = useSnackbar()

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)

  function trigger(type) {
    snackbar.addMessage({
      text: getRandomMessage(),
      type,
    })
  }

  return (
    <>
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

        <Grid item>
          <Button variant="outlined" color="primary" onClick={() => setDialogIsOpen(true)}>
            Open Dialog
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>Test with dialog</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogIsOpen(false)}>Close</Button>
          <Button onClick={() => trigger('success')} variant="contained">Create Message</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const Main = () => {
  return (
    <SnackbarProvider>
      <TriggerSnackbarButtons />
    </SnackbarProvider>
  )
}
