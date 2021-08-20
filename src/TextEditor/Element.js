import * as React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'


export const Element = ({ attributes, children, element }) => {

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <Typography variant="h2" component="h1" {...attributes}>{children}</Typography>
    case 'heading-two':
      return <Typography variant="h3" component="h2" {...attributes}>{children}</Typography>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link': {
      const url = children[0]?.props?.parent?.url ?? ''

      return (
        <Tooltip title={url}>
          <a {...attributes} href={element.url}>
            {children}
          </a>
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
