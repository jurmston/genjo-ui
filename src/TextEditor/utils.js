import isUrl from 'is-url'
import { Editor, Transforms, Point, Range, Element, Value } from 'slate'

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

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
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

const LIST_TYPES = ['numbered-list', 'bulleted-list']

/** Returns `true` if the block is active. */
export function isBlockActive(editor, block) {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === block,
  })

  return Boolean(match)
}

/** Returns `true` if the mark is active. */
export function isMarkActive(editor, format) {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

/** Toggles an editor mark */
export function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format)

  console.log({ format, isActive })

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

/** Toggles an editor block */
export function toggleBlock(editor, format) {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  console.log({ isActive, isList, format })

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    split: true,
  })

  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

/** Adds a new divider block into the editor content. */
export function insertDivider(editor) {
  const divider = {
    type: 'divider',
    children: [{ text: '' }],
  }

  const paragraph = {
    type: 'paragraph',
    children: [{ text: '' }],
  }

  Transforms.insertNodes(editor, divider)
  Transforms.insertNodes(editor, paragraph)
}

export function getCurrentNodeType(editor) {
  const { selection } = editor
  const currentNode = editor.children[selection.anchor.path[0]]
  return currentNode?.type
}

export function getCurrentWord(editor) {
  const text = Editor.string(editor, [])
  return text.substr(text.lastIndexOf(' ') + 1)
}

export function insertLink() {}
