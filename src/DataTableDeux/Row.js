import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditRounded'
import RemoveIcon from '@material-ui/icons/RemoveCircleRounded'
import FavoriteIcon from '@material-ui/icons/FavoriteRounded'

import { useDataTable } from './DataTableDeux'
import Checkbox from '../Checkbox'

import Cell from './Cell'

const ROW_HEIGHT = 36
const HEADER_HEIGHT = 48


export const Row = ({ rowIndex, top }) => {
  const { columns, rows, selected, selectionMode, toggleSelected } = useDataTable()

  const row = rows?.[rowIndex]
  const isSelected = !row?.id
    ? false
    : selectionMode === 'include'
    ? selected.has(row?.id)
    : !selected.has(row?.id)

  return (
    <div
      role="row"
      onClick={() => toggleSelected(row.id)}
      className={clsx(
        'GenjoDataTable__row',
        'GenjoDataTable__data-row',
        {
          'is-selected': isSelected,
        }
      )}
      style={{
        height: ROW_HEIGHT,
        maxHeight: ROW_HEIGHT,
        minHeight: ROW_HEIGHT,
        top,
      }}
    >
      <div
        className="GenjoDataTable__cell"
        style={{ width: ROW_HEIGHT, maxWidth: ROW_HEIGHT, minWidth: ROW_HEIGHT }}
      >
        {Boolean(row?.id) && (
          <Checkbox
            checked={isSelected}
            onClick={() => toggleSelected(row.id)}
          />
        )}
      </div>

      {columns.map((column, columnIndex) => (
        <Cell
          key={column.dataKey}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          value={row?.[column.dataKey]}
          width={column.width}
        />
      ))}

      <div
        className="GenjoDataTable__cell"
        style={{
          height: HEADER_HEIGHT,
        }}
      >
        <div className="GenjoDataTable__actions">
          <IconButton><EditIcon /></IconButton>
          <IconButton><FavoriteIcon /></IconButton>
          <IconButton><RemoveIcon /></IconButton>
        </div>
      </div>
    </div>
  )
}

Row.propTypes = {

}
