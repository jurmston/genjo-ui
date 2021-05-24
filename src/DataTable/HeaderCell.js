import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import ViewListIcon from '@material-ui/icons/ViewList'

import useDataTable from './useDataTable'

import HeaderDragHandle from './HeaderDragHandle'
import CheckboxHeader from './CheckboxHeader'


export const HeaderCell = React.memo(
  ({ style, columnIndex }) => {

    const {
      classes,
      columns,
      isResizing,
      hoveredState,
      onHover,
      rowCount,
      selector,
      sorting,
      subtotals,
    } = useDataTable()

    const {
      dataKey,
      title,
      type,
      align,
      isSortable,
      hasSubtotals,
      sortIcon: SortIcon,
    } = columns[columnIndex]

    if (type === 'checkbox') {
      if (columnIndex !== 0) {
        throw new Error(`Checkbox columns must come first.`)
      }

      if (!selector) {
        throw new Error(`Tables with checkbox columns must have a valid selector.`)
      }

      return (
        <CheckboxHeader
          classes={classes}
          style={style}
          status={selector.selected.size
            ? 'indeterminate'
            : selector.mode === 'exclude'
            ? 'checked'
            : 'empty'
          }
          onChange={selector.mode === 'include'
            ? selector.selectAll
            : selector.unselectAll
          }
        />
      )
    }

    const [isHovered, setIsHovered] = React.useState(false)

    function handleHoverOn() {
      setIsHovered(true)
      onHover(-1, columnIndex)
    }

    function handleHoverOff() {
      setIsHovered(false)
    }

    const clickProps = {}

    const isClickable = isSortable || hasSubtotals

    const isSelected = sorting?.key === dataKey

    if (isSortable) {
      clickProps.onClick = () => sorting?.setSortingKey(dataKey)
    }

    if (hasSubtotals) {
      clickProps.onDoubleClick = () => subtotals?.setSubtotalKey(dataKey)
    }

    if (type === 'actions') {
      return ''
    }

    return (
      <>
        <div
          role="button"
          tabIndex={0}
          style={{
            ...style,
            pointerEvents: isResizing ? 'none' : 'unset',
          }}
          className={clsx(classes.cell, classes.headerCell, {
            [classes.isSortable]: isSortable,
            [classes.isSelected]: isSelected,
            [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
            [classes.isClickable]: isClickable,
            [classes.isSubtotal]: subtotals?.key === dataKey,
          })}
          onMouseOver={handleHoverOn}
          onFocus={handleHoverOn}
          onMouseLeave={handleHoverOff}
          onBlur={handleHoverOff}
          {...clickProps}
        >
          <div className={classes.titleContainer} style={{ width: style.width - 16 }}>
            {subtotals?.key === dataKey && (
              <ViewListIcon style={{ marginRight: 8 }} />
            )}

            <span style={{ flex: 1, textAlign: align }}>{title}</span>

            {isSortable && (isHovered || isSelected) && Boolean(SortIcon) && (
              <SortIcon />
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
  },
)

HeaderCell.propTypes = {
  style: PropTypes.object,
  columnIndex: PropTypes.number,
}

HeaderCell.displayName = 'HeaderCell'


export default HeaderCell
