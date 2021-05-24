import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { areEqual } from 'react-window'

import Checkbox from '../Checkbox'
import Skeleton from '@material-ui/core/Skeleton'

import renderCell from './utils/renderCell'
import SubtotalCell from './SubtotalCell'
import SubtotalTitleRow from './SubtotalTitleRow'
import ActionButtons from './ActionButtons'


export const DataCell = React.memo(
  ({ columnIndex, rowIndex, style, data }) => {

    const {
      classes,
      columns,
      onHover,
      hoveredState,
      rowHeight,
      onRowClick,
      selector,
      customRenderers,
      rows,
      subtotals,
    } = data

    const {
      type,
      totalType,
      dataKey,
      align,
    } =  columns[columnIndex]

    const row = rows?.[rowIndex]
    const value = rows?.[rowIndex]?.[dataKey]

    const {
      subtotalTitle,
      subtotalValue,
      subtotalCount,
      subtotalType,
    } = subtotals?.[rowIndex] ?? {}


    // Calculate the cell top and height if subtotals are enabled.
    const { top, height } = subtotalType === 'title'
      ? { top: style.top + rowHeight, height: rowHeight }
      : subtotalType === 'value'
      ? { top: style.top, height: rowHeight }
      : { top: style.top, height: style.height }

    const cellContent = type === 'checkbox' ? (
      <Checkbox
        checked={selector.mode === 'include'
          ? selector.selected.has(row[selector.key])
          : !selector.selected.has(row[selector.key])
        }
        onChange={() => selector.toggle(row[selector.key])}
        onClick={event => {
          // Prevent propagation to `onRowClick` event.
          event.stopPropagation()
        }}
      />
    ) : type === 'actions' ? (
      <ActionButtons rowIndex={rowIndex} />
    ) : value === undefined ? (
      <Skeleton variant="text" />
    ) : (
      <span>
        {customRenderers[type]
          ? customRenderers[type](row)
          : renderCell(type, value)
        }
      </span>
    )

    function handleClick(event) {
      onRowClick?.(event, rowIndex)
    }

    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        onRowClick?.(event, rowIndex)
      }
    }

    return (
      <>
        {subtotalType === 'title' && columnIndex === 0 && (
          <SubtotalTitleRow
            value={subtotalTitle}
            count={subtotalCount}
            top={style.top}
            left={style.left}
          />
        )}

        <div
          role="button"
          tabIndex={0}
          className={clsx(classes.cell, {
            [classes.isSelected]: selector?.selected.has(row[selector.key]),
            [classes.hoveredRowCell]: hoveredState[0] === rowIndex,
            [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
            [classes.isClickable]: Boolean(onRowClick),
          })}
          style={{
            ...style,
            top,
            height,
            textAlign: align,
          }}
          onMouseOver={() => onHover(rowIndex, -1)}
          onFocus={() => onHover(rowIndex, -1)}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          {cellContent}
        </div>

        {subtotalType === 'value' && (
          <SubtotalCell
            columnIndex={columnIndex}
            type={totalType || type}
            value={subtotalValue}
            alignment={align}
            style={style}
          />
        )}
      </>
    )
  },

  // Check for memoization equality
  areEqual,
)

DataCell.propTypes = {
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.object,
}

DataCell.displayName = 'DataCell'

export default DataCell
