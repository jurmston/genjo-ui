import { Editor, Transforms, Point, Range } from 'slate'
import unified from 'unified'
import markdown from 'remark-parse'
import slate, { serialize } from 'remark-slate'


export function deserializeFromMarkdown(value) {
  if (value) {
    return unified()
      .use(markdown)
      .use(slate)
      .processSync(value)
      .result
  }

  return getEmptyValue()
}


export function serializeToMarkdown(value = []) {
  return value.map(v => serialize(v)).join('')
}


/** Returns a new empty slate value */
export function getEmptyValue() {
  return [
    {
      children: [
        { text: '' },
      ],
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

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
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