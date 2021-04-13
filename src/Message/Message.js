import * as React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
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
      <div className={classes.avatarContainer}>
        <Avatar
          src={user?.avatar}
          style={{ backgroundColor: user?.color ?? 'grey' }}
        >
          {user?.name?.[0]}
        </Avatar>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.title}>
          <Typography variant="subtitle2" display="inline" style={{ marginRight: 8 }}>{user?.fullName}</Typography>
          <Typography variant="caption" color="textSecondary" display="inline">
            {DateTime.fromISO(created).toLocaleString(DateTime.DATETIME_FULL)}
          </Typography>
        </div>

        <div className={classes.messagePanel}>
          <Slate editor={editor} value={JSON.parse(value)}>
            <Editable
              readOnly
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
        </div>

        <div className={classes.modified}>

        </div>

        <div className={classes.reactions}>

        </div>

      </div>
    </div>
  )
}

Message.propTypes = {

}

export default Message
