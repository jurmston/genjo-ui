import React from 'react'
// import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

import { SortableHeader } from './SortableHeader'
import { colors } from '../colors'

import Draggable from 'react-draggable'

 import { useTable } from './context'

const useStyles = makeStyles(theme => ({
  cell: {
    transition: 'background-color 300ms linear',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    '& > div': {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  headerCell: {
    borderBottom: `2px solid ${colors.blueGrey[300]}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: colors.blueGrey[50],
      '& $resizeHeaderButton': {
        opacity: 1,
      },
    },

    // MultiGrid appends a little filler region when the scroll bar is turned
    // off. This selector gets that region if it's visible and adds the bottom
    // border to make it look seemless with the rest of the headers.
    '&:nth-last-child(2) ~ div:not($headerCell)': {
      borderBottom: `2px solid ${colors.blueGrey[300]}`,
    }
  },

  resizeHeaderButton: {
    transition: theme.transitions.create('opacity'),
    opacity: 0,
    position: 'absolute',
    right: 4,
    top: 2,
    width: 6,
    bottom: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: colors.blueGrey[700],
    cursor: 'col-resize',
  },

}))


const HeaderCell = ({
  style,
  rowIndex,
  columnIndex,
  isFixed = false,
}) => {

  const classes = useStyles()

  const {
    columns,
    handleResizeColumn,
    fixedColumnCount,
    height,
    getColumnWidth,
    minWidth,
    maxWidth,
    dragInfo,
    handleDragEnd,
    handleDragStart,
    handleDrag,
  } = useTable()
  // There is an= known issue with Draggable not being complient with
  // strict mode. Here's a recommended fix.
  // https://stackoverflow.com/questions/63603902/finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-instance-of-d
  const nodeRef = React.useRef()

  const { title } = columns[columnIndex] ?? {}



  return (
    <div
      style={{
        ...style,
        pointerEvents: dragInfo ? 'none' : 'unset',
      }}
      className={clsx(
        classes.cell,
        classes.headerCell,
      )}
      /*onMouseOver={() => handleHoverCell(rowIndex, columnIndex)}*/
    >
      <div style={{ position: 'relative' }}>
        <SortableHeader>{title}</SortableHeader>
        <Draggable
          axis="x"
          aria-label="Resize Column"
          position={{ x: 0 }}
          nodeRef={nodeRef}
          onStart={event => handleDragStart(event, columnIndex)}
          onStop={handleDragEnd}
          onDrag={handleDrag}
        >
          <div ref={nodeRef} className={classes.resizeHeaderButton} />
        </Draggable>

      </div>
    </div>
  )
}

HeaderCell.propTypes = {

}


const FixedHeaderCell = props => (
  <HeaderCell {...props} isFixed />
)


export { HeaderCell, FixedHeaderCell }
