import React from 'react'
import PropTypes from 'prop-types'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import isEqual from 'react-fast-compare'

import TextEditorContext from './TextEditorContext'
import { ButtonPanel } from './ButtonPanel'
import { Input } from './Input'
import { useStyles } from './styles'

import { getEmptyValue } from './utils'

import { withLinks } from './plugins/links'
import { withDeleteBackwards } from './plugins/delete-backwards'
import { Leaf } from './Leaf'
import { Element } from './Element'

export const TextEditor = ({
  readOnly = false,
  value: valueFromProps = null,
  onSave,
  children,
  resetOnSave,
  variant = 'message',
  minHeight,
  maxHeight,
  ref,
}) => {
  const classes = useStyles({ readOnly })

  const [value, setValue] = React.useState(getEmptyValue())
  const [originalValue, setOriginalValue] = React.useState(getEmptyValue())
  const isDirty = !isEqual(value, originalValue)

  const [isFocused, setIsFocused] = React.useState(false)

  const editor = React.useMemo(() => withLinks(withDeleteBackwards(withHistory(withReact(createEditor())))), [])

  function resetEditor() {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    }
  }

  function handleSave() {
    onSave?.(value)

    if (resetOnSave) {
      resetEditor()
      setValue(getEmptyValue())
    }
  }

  function handleChange(newValue) {
    setValue(newValue)

    if (ref?.current) {
      ref.current = newValue
    }
  }
  // React.useEffect(() => {
  //   if (!value) {
  //     resetEditor()
  //   }
  // }, [value])

  // Synchronize the value whenever the props value changes.
  React.useEffect(() => {
    resetEditor()
    setValue(valueFromProps || getEmptyValue())
    setOriginalValue(valueFromProps || getEmptyValue())
  }, [valueFromProps])

  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  return (
    <TextEditorContext.Provider
      value={{
        classes,
        setIsFocused,
        isFocused,
        handleSave,
        isDirty,
        value,
        renderElement,
        renderLeaf,
        hasSaveButton: Boolean(onSave),
      }}
    >
      <Slate editor={editor} value={value} onChange={handleChange}>
        <div className={classes.editor}>
          <Input minHeight={minHeight} maxHeight={maxHeight} />
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
  value: PropTypes.any,
  title: PropTypes.string,
  /**
   * Callback fired when the user wants the content .
   *
   * @param {string} value The JSON representation of the changed content.
   */
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  saveOnEnter: PropTypes.bool,
  variant: PropTypes.oneOf(['message', 'post']),
}

export default TextEditor
