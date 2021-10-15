import * as React from 'react'
import PropTypes from 'prop-types'

// import COMPONENT from '@mui/material/COMPONENT'
import { Element } from './Element'
import { Leaf } from './Leaf'
import { createEditor } from 'slate'
import { Slate, Editable,withReact } from 'slate-react'
import { useMessageStyles } from './styles'

export function RenderedText({ value = [] }) {
  const classes = useMessageStyles()
  const editor = React.useMemo(() => withReact(createEditor()), [])
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  return (
    <div className={classes.message}>
      <Slate editor={editor} value={value}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  )
}

RenderedText.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
}
