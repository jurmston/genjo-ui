import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Checkbox from '@material-ui/core/Checkbox'

import useDataTable from '../useDataTable'

import getCellAlignment from '../utils/getCellAlignment'
import HeaderDragHandle from './HeaderDragHandle'
import getSortIcon from '../utils/getSortIcon'




const HeaderCell = ({
  style,
  columnIndex,
}) => {

  const {
    classes,
    columns,
    dragInfo,
    selectedCells,
    toggleSelectAll,
    hoveredState,
    onHover,
    rowCount,
    sortBy,
    setSortBy,
    setSubtotalField,
  } = useDataTable()

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
        onFocus={() => onHover(-1, columnIndex)}
      >
        <Checkbox
          checked={selectedCells.size === rowCount}
          indeterminate={selectedCells.size > 0 && selectedCells.size < rowCount}
          onChange={toggleSelectAll}
        />
      </div>
    )
  }

  const {
    title,
    type,
    dataKey,
    align,
    hasSubtotal = false,
  } = columns[columnIndex - 1]

  const isSelected = sortBy.endsWith(dataKey)
  const direction = sortBy.startsWith('-') ? 'DESC' : 'ASC'

  const IconComponent = React.useMemo(
    () => getSortIcon({ isSelected, type, direction }),
    [isSelected, direction, type]
  )

  const [isHovered, setIsHovered] = React.useState(false)

  const clickProps = {}
  if (type) {
    clickProps.onClick = () => setSortBy(sortBy === dataKey ? `-${dataKey}` : dataKey)
  }

  if (hasSubtotal) {
    clickProps.onDoubleClick = () => {
      setSortBy(dataKey)
      setSubtotalField(dataKey)
    }
  }

  function handleHoverOn() {
    setIsHovered(true)
    onHover(-1, columnIndex)
  }

  function handleHoverOff() {
    setIsHovered(false)
  }

  return (
    <>
      <div
        style={{
          ...style,
          pointerEvents: dragInfo ? 'none' : 'unset',
        }}
        className={clsx(classes.cell, classes.headerCell, {
          [classes.isSortable]: Boolean(type),
          [classes.isSelected]: isSelected,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
        })}
        onMouseOver={handleHoverOn}
        onFocus={handleHoverOn}
        onMouseLeave={handleHoverOff}
        onBlur={handleHoverOff}
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

      <HeaderDragHandle
        style={style}
        isHovered={isHovered}
        columnIndex={columnIndex}
      />

    </>
  )
}

HeaderCell.propTypes = {
  style: PropTypes.object,
  columnIndex: PropTypes.number,
}


export { HeaderCell }
