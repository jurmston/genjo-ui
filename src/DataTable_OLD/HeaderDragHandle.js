import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Draggable from 'react-draggable'

import useDataTable from './useDataTable'


export const HeaderDragHandle = ({ style, isHovered, columnIndex }) => {
  const {
    classes,
    startResizing,
    stopResizing,
    onResize,
  } = useDataTable()

  // There is an= known issue with Draggable not being complient with
  // strict mode. Here's a recommended fix.
  // https://stackoverflow.com/questions/63603902/finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-instance-of-d
  const nodeRef = React.useRef()

  return (
    <Draggable
      axis="x"
      aria-label="Resize Column"
      position={{ x: 0 }}
      nodeRef={nodeRef}
      onStart={() => startResizing(columnIndex)}
      onStop={() => stopResizing()}
      onDrag={(event, { deltaX }) => onResize(deltaX)}
    >
      <div
        ref={nodeRef}
        className={clsx(classes.resizeHeaderButton, isHovered && classes.isHovered)}
        style={{
          top: style.top,
          left: style.left + style.width - 4,
          height: style.height,
        }}
      />
    </Draggable>
  )
}

HeaderDragHandle.propTypes = {
  style: PropTypes.object,
  isHovered: PropTypes.bool,
  columnIndex: PropTypes.number,
}

export default HeaderDragHandle
