import * as React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useSlate } from 'slate-react'

import ClosableDialogTitle from '../ClosableDialogTitle'
import { insertLink } from './plugins/links'

import { Editor } from 'slate'


export const LinkDialog = ({ isOpen, onClose, selection }) => {
  const [url, setUrl] = React.useState('')

  const editor = useSlate()

  React.useEffect(
    () => {
      if (isOpen && selection) {
        const newUrl = Editor.string(editor, selection)
        setUrl(newUrl)
      }
    },
    [isOpen, selection]
  )

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <ClosableDialogTitle onClose={onClose}>Edit Link</ClosableDialogTitle>
      <DialogContent>
        <TextField
          variant="filled"
          label="URL"
          value={url}
          onChange={event => setUrl(event.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          disabled={!url}
          variant="contained"
          color="primary"
          onClick={() => {
            insertLink(editor, url, selection)
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selection: PropTypes.object,
}
