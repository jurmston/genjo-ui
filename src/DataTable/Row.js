import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/EditRounded'
import RemoveIcon from '@mui/icons-material/RemoveCircleRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'

import { useDataTable } from './useDataTable'
import Checkbox from '../Checkbox'

import Cell from './Cell'


export const Row = ({ rowIndex, top, rowHeight, actionsWidth, scrollbarWidth }) => {
  const {
    columns,
    rows,
    selected,
    selectionMode,
    toggleSelectRow,
    renderActions,
  } = useDataTable()

  const row = rows?.[rowIndex]
  const isSelected = !row?.id
    ? false
    : selectionMode === 'include'
    ? selected.has(row?.id)
    : !selected.has(row?.id)

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === " ") {
      toggleSelectRow(event, row?.id, rowIndex)
    }
  }

  return (
    <div
      role="row"
      tabIndex={0}
      onClick={event => toggleSelectRow(event, row?.id, rowIndex)}
      onKeyPress={handleKeyPress}
      onMouseDown={event => {
        // If there are selected elements we need to prevent the mouseDown
        // event from selecting text because this interfere's with the shift-
        // click to select functionality.
        if (selected.size && event.shiftKey) {
          event.preventDefault()
        }
      }}
      className={clsx(
        'GenjoDataTable__row',
        'GenjoDataTable__data-row',
        {
          'is-selected': isSelected,
        }
      )}
      style={{
        height: rowHeight,
        maxHeight: rowHeight,
        minHeight: rowHeight,
        top,
      }}
    >
      <div
        className="GenjoDataTable__cell"
        style={{ width: rowHeight, maxWidth: rowHeight, minWidth: rowHeight }}
      >
        {Boolean(row?.id) && (
          <Checkbox
            checked={isSelected}
          />
        )}
      </div>

      {columns.map((column, columnIndex) => (
        <Cell
          key={column.dataKey}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          row={row}
          value={row?.[column.dataKey]}
          width={column.width}
        />
      ))}

      {actionsWidth > 0 && (
        <div
          className="GenjoDataTable__cell"
          style={{
            height: rowHeight,
            width: actionsWidth - scrollbarWidth,
            maxWidth: actionsWidth - scrollbarWidth,
            minWidth: actionsWidth - scrollbarWidth,
          }}
        >
          <div className="GenjoDataTable__actions">
            {renderActions?.(rowIndex, row)}
          </div>
        </div>
      )}
    </div>
  )
}

Row.propTypes = {

}
