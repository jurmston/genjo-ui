import React from 'react'
import PropTypes from 'prop-types'
import { createEditor } from 'slate'
import { Slate, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import TextEditorContext from './TextEditorContext'
import { ButtonPanel } from './ButtonPanel'
import { Input } from './Input'
import { LinkDialog } from './LinkDialog'

import { withLinks, isLinkActive, unwrapLink } from './plugins/links'
// import { withDeleteBackwards } from './plugins/delete-backwards'
import { Leaf } from './Leaf'
import { Element } from './Element'
import { EditorBox } from './EditorBox'


/**
 * A Rich Text Editor
 *
 * There was a breaking change some time around slate v.067.0 where the value
 * prop changed to an initialValue instead of being synced like a typical
 * useState value.
 */
export const TextEditor = ({
  readOnly = false,
  initialValue,
  onChange,
  minHeight,
  maxHeight,
  buttonPanelPosition = 'bottom',
  variant = 'contained',
  hideButtonPanel = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    if (isFocused) {
      ReactEditor.focus(editor)
    }
  }, [isFocused])

  const editor = React.useMemo(() => withLinks(withHistory(withReact(createEditor()))), [])

  const [value, setValue] = React.useState(initialValue)

  const [linkSelection, setLinkSelection] = React.useState(null)

  /**
   * Manually set the isFocused state to `true`. This is used for clicks and
   * tabs to (typoically) non-interactive elements like wrappers.
   */
  const handleFocus = React.useCallback(
    () => {
      if (!isFocused) {
        setIsFocused(true)
      }
    },
    [isFocused],
  )

  /**
   * Blur the entire editor if the blur event is outside the editor. If the
   * new focus is within the editor the `isFocus` state should remain `true`
   */
  const handleBlur = React.useCallback(
    event => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setIsFocused(false)
      }
    },
    []
  )


  /**
   * Callback for handling changes to the editor state.
   *
   * There was a breaking in Slate where the value when from being synced, to
   * more like an initial value.
   * Issue: https://github.com/ianstormtaylor/slate/pull/4540
   *
   * The updated "Save to database" example uses this implementation.
   * Example: https://docs.slatejs.org/walkthroughs/06-saving-to-a-database
   */
  const handleChange = React.useCallback(
    newValue => {
      setValue(newValue)

      const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)

      if (isAstChange) {
        onChange(newValue)
      }
    },
    [editor, onChange],
  )

  /**
   * If the current block is wrapped in a link, unwrap it. Otherwise, capture
   * the current selection and pass that to the link editor dialog.
   */
  const toggleLink = React.useCallback(
    () => {
      if (isLinkActive(editor)) {
        unwrapLink(editor)
      } else {
        setLinkSelection(editor.selection)
      }
    },
    [editor]
  )

  const renderElement = React.useCallback(props => <Element {...props} />, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  const showButtonPanel = React.useMemo(
    () => !readOnly && (isFocused || !hideButtonPanel),
    [isFocused, hideButtonPanel, readOnly],
  )

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <TextEditorContext.Provider
        value={{
          setIsFocused,
          isFocused,
          value,
          handleChange,
          renderElement,
          renderLeaf,
          handleFocus,
          readOnly,
          linkSelection,
          setLinkSelection,
          variant,
          hideButtonPanel,
          buttonPanelPosition,
          showButtonPanel,
          toggleLink,
        }}
      >
        <Slate editor={editor} value={value} onChange={handleChange}>
          <EditorBox>
            {showButtonPanel && buttonPanelPosition === 'top' && <ButtonPanel />}
            <Input minHeight={minHeight} maxHeight={maxHeight} />
            {showButtonPanel && buttonPanelPosition === 'bottom' && <ButtonPanel />}
          </EditorBox>
        </Slate>

        <LinkDialog
          isOpen={Boolean(linkSelection)}
          selection={linkSelection}
          onClose={() => setLinkSelection(null)}
          editor={editor}
        />
      </TextEditorContext.Provider>
    </div>
  )
}

TextEditor.propTypes = {
  /** If `true` the content cannot be edited */
  readOnly: PropTypes.bool,
  /** The initial JSON value of the content */
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  variant: PropTypes.oneOf(['contained', 'open']),
  hideButtonPanel: PropTypes.bool,
  buttonPanelPosition: PropTypes.oneOf(['top', 'bottom']),
}
