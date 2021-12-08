import { Editor, Transforms, Point, Range, Element } from 'slate'
import { LIST_TYPES } from '../types'

/** Returns a new empty slate value */
export function getEmptyValue() {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
}

/**
 * Adds backspace command to editor
 */
export const withDeleteBackwards = editor => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (block.type !== 'paragraph' && Point.equals(selection.anchor, start)) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item' || block.type === 'checklist-item') {
            Transforms.unwrapNodes(editor, {
              match: n => console.log('y', n.type, n) || LIST_TYPES.includes(n?.type),
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}