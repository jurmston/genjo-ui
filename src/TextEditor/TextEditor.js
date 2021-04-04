import React from 'react'
import PropTypes from 'prop-types'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import isEqual from 'react-fast-compare'

import { compose } from '../utils/functional'

import { Element } from './Element'
import { Leaf } from './Leaf'
import { TextEditorContext } from './context'
import { ButtonPanel } from './ButtonPanel'
import { Input } from './Input'
import { useStyles } from './styles'

import {
  withDeleteBackwards,
  getEmptyValue,
  serializeToMarkdown,
  deserializeFromMarkdown,
} from './utils'



const TextEditor = ({
  readOnly = false,
  value: valueFromProps = null,
  onSave,
  saveOnEnter = false,
}) => {
  const classes = useStyles({ readOnly })

  const [value, setValue] = React.useState(getEmptyValue())
  const [originalValue, setOriginalValue] = React.useState(getEmptyValue())
  const isDirty = !isEqual(value, originalValue)

  const [isFocused, setIsFocused] = React.useState(false)

  const renderElement = React.useCallback(props => <Element {...props} />, [])

  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  const editor = React.useMemo(
    () => compose(
      withDeleteBackwards,
      withHistory,
      withReact,
      createEditor,
    )(),
    []
  )

  function handleSave() {
    if (!onSave) {
      return
    }

    const markdown = serializeToMarkdown(value)
    onSave(markdown)
  }

  React.useEffect(() => {
    if (!value) {
      //  Transforms.deselect(editor)
       // or set selection to neutral state:
       editor.selection = { anchor: { path: [0,0], offset:0 }, focus: { path: [0,0], offset: 0 } }
    }
  }, [value])

  // Synchronize the value whenever the props value changes.
  React.useEffect(
    () => {
      setValue(deserializeFromMarkdown(valueFromProps))
      setOriginalValue(deserializeFromMarkdown(valueFromProps))
    },
    [valueFromProps]
  )

  return (
    <TextEditorContext.Provider
      value={{
        classes,
        renderElement,
        renderLeaf,
        setIsFocused,
        isFocused,
        handleSave,
        isDirty,
      }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={setValue}
      >
        <div className={classes.editor}>
          <Input />
          <ButtonPanel />
        </div>
      </Slate>
    </TextEditorContext.Provider>
  )
}


TextEditor.propTypes = {
  /** If `true` the content cannot be edited */
  readOnly: PropTypes.bool,
  /** The initial JSON value of the content */
  value: PropTypes.string,
  title: PropTypes.string,
  /**
   * Callback fired when the user wants the content .
   *
   * @param {string} value The JSON representation of the changed content.
   */
  onSave: PropTypes.func,
}


export { TextEditor }
