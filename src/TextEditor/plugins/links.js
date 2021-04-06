import isUrl from 'is-url'
import { Editor, Transforms, Range, Element } from 'slate'
import {
  getCurrentWord,
  getCurrentNodeType,
} from '../utils'


export function withLinks(editor) {
  const { insertData, insertText, isInline, insertBreak } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const currentWord = getCurrentWord(editor)
      console.log(currentWord)
      // if (isUrl(currentWord)) {
      //   const link = {
      //     type: 'link',
      //     url: currentWord,
      //     children: [{ text: currentWord }],
      //   }

      //     // Convert the text to a link node
      //     Transforms.wrapNodes(editor, link)
      //     Transforms.collapse(editor, { edge: 'end' })
      // }
    }

    insertBreak()
  }

  editor.insertText = text => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const currentWord = getCurrentWord(editor)

      if (isUrl(currentWord)) {
        const link = {
          type: 'link',
          url: currentWord,
          children: [{ text: currentWord }],
        }

          // Convert the text to a link node
          Transforms.wrapNodes(editor, link)
      }

    }

    insertText(text)

    // insertText(text)

    // const currentNodeType = getCurrentNodeType(editor)
    // const currentWord = getCurrentWord(editor)

    // console.log({ currentNodeType, currentWord, selection: editor.selection })



    // if (currentNodeType === 'paragraph' && isUrl(currentWord)) {

    //   const selection = editor.selection

    //   // Select the auto-detected link
    //   Transforms.setSelection(editor, {
    //     ...selection,
    //     anchor: {
    //       ...selection.anchor,
    //       offset: selection.anchor.offset - currentWord.length,
    //     }
    //   })

    //   const link = {
    //     type: 'link',
    //     url: currentWord,
    //     hasDisplayText: false,
    //     children: [{ text: currentWord }],
    //   }

    //   // Convert the text to a link node
    //   Transforms.wrapNodes(editor, link)

    //   Transforms.collapse(editor, { edge: 'end' })
    //   Transforms.move(editor)
    //   // Transforms.move(editor, { distance: 1, unit: 'character', reverse: true })

    // }

  }

  // editor.insertData = data => {
  //   const text = data.getData('text/plain')

  //   if (text && isUrl(text)) {
  //     wrapLink(editor, text)
  //   } else {
  //     insertData(data)
  //   }
  // }

  return editor
}

function insertLink(editor, url) {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

function isLinkActive(editor) {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
  return !!link
}

function unwrapLink(editor) {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
}

const wrapLink = (editor, url) => {
  // if (isLinkActive(editor)) {
  //   unwrapLink(editor)
  // }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link)
  }
}
