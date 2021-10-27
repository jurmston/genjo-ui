import React from 'react'
import PropTypes from 'prop-types'
import { createEditor } from 'slate'
import { Slate, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import TextEditorContext from './TextEditorContext'
import { ButtonPanel } from './ButtonPanel'
import { Input } from './Input'
import { useStyles } from './styles'

import { withLinks } from './plugins/links'
import { withDeleteBackwards } from './plugins/delete-backwards'
import { Leaf } from './Leaf'
import { Element } from './Element'


export const TextEditor = ({
  readOnly = false,
  value,
  onChange,
  minHeight,
  maxHeight,
}) => {
  const classes = useStyles({ readOnly })

  const [isFocused, setIsFocused] = React.useState(false)

  const editor = React.useMemo(() => withLinks(withDeleteBackwards(withHistory(withReact(createEditor())))), [])

  React.useEffect(
    () => {
      if (isFocused) {
        ReactEditor.focus(editor)
      }
    },
    [isFocused, editor]
  )

  function handleManualFocus() {
    if (!isFocused) {
      setIsFocused(true)
    }
  }

  function handleChange(newValue) {
    onChange(newValue)
  }

  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  return (
    <TextEditorContext.Provider
      value={{
        classes,
        setIsFocused,
        isFocused,
        value,
        renderElement,
        renderLeaf,
      }}
    >
      <Slate editor={editor} value={value} onChange={handleChange}>
        <div
          className={classes.editor}
          onClick={handleManualFocus}
          onKeyPress={handleManualFocus}
          role="textbox"
          tabIndex={0}
        >
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
  onChange: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
}
