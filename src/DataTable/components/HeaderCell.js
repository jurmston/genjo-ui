import React from 'react'
// import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

import { SortableHeader } from './SortableHeader'

import Draggable from 'react-draggable'

import { useTable } from '../context'

import SortAlphaIcon from '../../icons/SortAlphaIcon'
import SortAlphaAscendingIcon from '../../icons/SortAlphaAscendingIcon'
import SortAlphaDescendingIcon from '../../icons/SortAlphaDescendingIcon'
import SortNumberIcon from '../../icons/SortNumberIcon'
import SortNumberAscendingIcon from '../../icons/SortNumberAscendingIcon'
import SortNumberDescendingIcon from '../../icons/SortNumberDescendingIcon'
import SortGenericIcon from '../../icons/SortGenericIcon'
import SortGenericAscendingIcon from '../../icons/SortGenericAscendingIcon'
import SortGenericDescendingIcon from '../../icons/SortGenericDescendingIcon'
import { colors } from '../../colors'


/** Get the icon component given sort type and direction. */
function getSortIcon(isSelected, type, direction) {
  if (!type) {
    return null
  }

  if (type === 'alpha') {
    return !isSelected
      ? SortAlphaIcon
      : direction === 'ASC'
      ? SortAlphaAscendingIcon
      : SortAlphaDescendingIcon
  }

  if (type === 'number') {
    return !isSelected
      ? SortNumberIcon
      : direction === 'ASC'
      ? SortNumberAscendingIcon
      : SortNumberDescendingIcon
  }

  return !isSelected
    ? SortGenericIcon
    : direction === 'ASC'
    ? SortGenericAscendingIcon
    : SortGenericDescendingIcon
}


function getAlignment(field_type) {
  switch (field_type) {
    default: {
      return 'left'
    }
  }
}


const HeaderCell = ({
  style,
  rowIndex,
  columnIndex,
}) => {

  const {
    classes,
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
    selectedCells,
    toggleSelectAll,
    toggleSelectRow,
    hoveredState,
    onHover,
    rowCount,
    sortBy,
    setSortBy,
    subtotalField,
    setSubtotalField,
    getHeaderData,
  } = useTable()
  // There is an= known issue with Draggable not being complient with
  // strict mode. Here's a recommended fix.
  // https://stackoverflow.com/questions/63603902/finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-instance-of-d
  const nodeRef = React.useRef()

  if (columnIndex === 0) {
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
        onMouseOver={() => onHover(-1, columnIndex)}
      >
        <Checkbox
          checked={selectedCells.size === rowCount}
          indeterminate={selectedCells.size > 0 && selectedCells.size < rowCount}
          onChange={toggleSelectAll}
        />
      </div>
    )
  }

  const { title, sortType, align, fieldName, hasSubtotal } = getHeaderData(columnIndex - 1)

  const isSelected = sortBy.endsWith(fieldName)
  const direction = sortBy.startsWith('-') ? 'DESC' : 'ASC'

  const IconComponent = React.useMemo(
    () => getSortIcon(isSelected, sortType, direction),
    [isSelected, direction, sortType]
  )

  const [isHovered, setIsHovered] = React.useState(false)

  const clickProps = {}
  if (sortType) {
    clickProps.onClick = () => setSortBy(sortBy === fieldName ? `-${fieldName}` : fieldName)
  }

  if (hasSubtotal) {
    clickProps.onDoubleClick = () => {
      setSortBy(fieldName)
      setSubtotalField(fieldName)
    }
  }

  return (
    <>
      <div
        style={{
          ...style,
          pointerEvents: dragInfo ? 'none' : 'unset',
        }}
        className={clsx(classes.cell, classes.headerCell, {
          [classes.isSortable]: Boolean(sortType),
          [classes.isSelected]: isSelected,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
        })}
        onMouseOver={() => {
          setIsHovered(true)
          onHover(-1, columnIndex)
        }}
        onMouseLeave={() => setIsHovered(false)}
        {...clickProps}
      >
        <div className={classes.titleContainer} style={{ width: style.width - 16 }}>

          <span style={{ flex: 1, textAlign: align }}>{title}</span>

          {isSelected && Boolean(IconComponent) && (
            <IconComponent
              className={clsx(classes.sortIcon, {
                [classes.isSelected]: isSelected,
              })}
            />
          )}

        </div>
      </div>

      <Draggable
        axis="x"
        aria-label="Resize Column"
        position={{ x: 0 }}
        nodeRef={nodeRef}
        onStart={event => handleDragStart(event, columnIndex - 1)}
        onStop={handleDragEnd}
        onDrag={handleDrag}
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
    </>
  )
}

HeaderCell.propTypes = {

}


export { HeaderCell }
