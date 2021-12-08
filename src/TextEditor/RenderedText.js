import * as React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import { Element } from './Element'
import { Leaf } from './Leaf'
import { createEditor } from 'slate'
import { Slate, Editable,withReact } from 'slate-react'
import { getTextSx } from './styles'

export function RenderedText({ value = [] }) {
  const editor = React.useMemo(() => withReact(createEditor()), [])
  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  const sx = React.useMemo(
    () => getTextSx(),
    []
  )

  return (
    <Box sx={sx}>
      <Slate editor={editor} value={value}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Box>
  )
}

RenderedText.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
}
