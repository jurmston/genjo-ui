import { Editor, Transforms, Element } from 'slate'


/** Returns a new empty slate value */
export function getEmptyValue() {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
}

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'checklist']
const CHECKLIST_TYPE = 'checklist'

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

export function isColorActive(editor, color) {
  const marks = Editor.marks(editor)
  return marks ? marks[color] === true : false
}

/** Toggles an editor mark */
export function toggleMark(editor, format, value = true) {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, value)
  }
}

/** Toggles an editor block */
export function toggleBlock(editor, format) {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)
  const isChecklist = format === CHECKLIST_TYPE

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    split: true,
  })

  const newProperties = {
    type: isActive
      ? 'paragraph'
      : !isList
      ? format
      : isChecklist
      ? 'checklist-item'
      : 'list-item',
  }

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
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


export function renderHotkey(hotkey = '') {
  const isMac = /Mac|iPod|iPhone|iPad/.test(window?.navigator?.platform ?? '')

  return hotkey
    .replace('mod', isMac ? '⌘' : 'Ctrl')
    .replace('option', isMac ? '⌥' : 'Alt')
    .replace('shift', 'Shift')
}
