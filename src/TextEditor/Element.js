import * as React from 'react'
import PropTypes from 'prop-types'
import { useTextEditor } from './context'


export const Element = ({ attributes, children, element }) => {
  const { classes } = useTextEditor()

  switch (element.type) {
    case 'block-quote':
      return <blockquote className={classes.quote} {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'divider':
      return <hr />
    case 'link':
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        )
    default:
      return <p {...attributes}>{children}</p>
  }
}

Element.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.any,
  children: PropTypes.node,
}
