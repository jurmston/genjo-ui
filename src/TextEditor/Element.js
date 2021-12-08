import * as React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Checkbox from '../Checkbox'
import {
  useSlateStatic,
  useReadOnly,
  ReactEditor,
} from 'slate-react'
import {
  Transforms,
} from 'slate'


const ChecklistItem = React.forwardRef(function ChecklistItem({ attributes, children, element }, ref) {
  const editor = useSlateStatic()
  const readOnly = useReadOnly()
  const { checked } = element

  return (
    <li ref={ref} style={{ listStyle: 'none' }} {...attributes}>
      <span
        contentEditable={false}
        style={{ marginRight: 4 }}
      >
        <Checkbox
          checked={checked || false}
          onChange={event => {
            const path = ReactEditor.findPath(editor, element)
            const newProperties = {
              checked: event.target.checked,
            }
            Transforms.setNodes(editor, newProperties, { at: path })
          }}
        />
      </span>

      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        style={{ flex: 1 }}
      >
        {children}
      </span>
    </li>
  )
})

ChecklistItem.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.any,
  children: PropTypes.node,
}

const listStyle = {
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 0,
  marginInlineEnd: 0,
  paddingInlineStart: 0,
  marginLeft: 16,
}


export const Element = ({ attributes, children, element }) => {

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
    case 'checklist':
      return <ul style={listStyle} {...attributes}>{children}</ul>
    case 'heading-one':
      return <Typography variant="h2" component="h1" {...attributes}>{children}</Typography>
    case 'heading-two':
      return <Typography variant="h3" component="h2" {...attributes}>{children}</Typography>
    case 'list-item':
      return <li style={listStyle} {...attributes}>{children}</li>
    case 'checklist-item':
      return <ChecklistItem {...attributes} element={element}>{children}</ChecklistItem>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link': {
      const url = children[0]?.props?.parent?.url ?? ''

      return (
        <Tooltip title={url}>
          <Box
            component="a"
            {...attributes}
            href={element.url}
            sx={{
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      )
    }

    default:
      return <p {...attributes}>{children}</p>
  }
}

Element.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.any,
  children: PropTypes.node,
}

export default Element
