import * as React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ClosableDialogTitle } from '../ClosableDialogTitle'
import { useSlate } from 'slate-react'

import { insertLink } from './utils'


export const LinkDialog = ({
  isOpen,
  onClose,
  text: textFromProps = '',
  url: urlFromProps = '',
  onSave,
  linkInfo,
}) => {
  const [text, setText] = React.useState('')
  const [url, setUrl] = React.useState('')

  const editor = useSlate()

  React.useEffect(
    () => {
      setText(textFromProps)
      setUrl(urlFromProps)
    },
    [isOpen, textFromProps, urlFromProps]
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <ClosableDialogTitle onClose={onClose}>Edit Link</ClosableDialogTitle>
      <DialogContent>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              variant="filled"
              label="Text"
              value={text}
              onChange={event => setText(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="filled"
              label="URL"
              value={url}
              onChange={event => setUrl(event.target.value)}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          disabled={!url}
          variant="contained"
          color="primary"
          onClick={() => {
            insertLink(editor, linkInfo?.selection, url, text)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

LinkDialog.propTypes = {

}
