import * as React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { DateTime } from 'luxon'

import { useMessageStyles, Element, Leaf } from '../TextEditor'
import { createEditor } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  avatarContainer: {
    marginRight: 16,
  },

  contentContainer: {
    flex: 1,
  },

}))


export const Message = ({ value, created, modified, user, reactions,  }) => {

  const classes = useStyles()
  const messageClasses = useMessageStyles()

  const editor = React.useMemo(() => withReact(createEditor()), [])
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  return (
    <div className={classes.root}>
      <Slate editor={editor} value={JSON.parse(value)}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  )
}

Message.propTypes = {

}

export default Message
