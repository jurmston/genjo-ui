import React from 'react'
import PropTypes from 'prop-types'

import { areEqual } from 'react-window'
import { makeStyles } from '@material-ui/core/styles'
import { DateTime } from 'luxon'

import Checkbox from '@material-ui/core/Checkbox'
import Skeleton from '@material-ui/core/Skeleton'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'


import clsx from 'clsx'
import { useTable } from '../context'
import { colors } from '../../colors'


function renderCell(field_type, cellData) {
  if (cellData === '__loading__') {
    return (
      <div><Skeleton variant="text" /></div>
    )

  }

  switch (field_type) {
    case 'currency': {
      return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <span style={{ flex: 1 }}>$</span>
          <span>{Number(cellData).toFixed(2)}</span>
        </div>
      )
    }

    case 'number': {
      return (
        <div style={{ textAlign: 'right' }}>
          {Math.round((Number(cellData) + Number.EPSILON) * 100) / 100}
        </div>
      )
    }

    case 'datetime': {
      return (
        <div style={{ textAlign: 'right'}}>
          {DateTime.fromISO(cellData).toLocaleString(DateTime.DATETIME_SHORT)}
        </div>
      )
    }

    case 'date': {
      return (
        <div style={{ textAlign: 'right' }}>
          {DateTime.fromISO(cellData).toLocaleString(DateTime.DATE_SHORT)}
        </div>
      )
    }

    case 'bool': {
      return (
        <div style={{ textAlign: 'center' }}>
          {cellData
            ? <CheckCircleIcon style={{ color: colors.green[500] }} />
            : <CancelIcon style={{ color: colors.red[500] }} />
          }
        </div>
      )
    }

    default: {
      return (
        <div>{cellData}</div>
      )
    }
  }
}



const DataCell = React.memo(
  ({ columnIndex, rowIndex, style }) => {

    const {
      classes,
      columns,
      getCellData,
      onHover,
      hoveredState,
      fixedColumnCount,
      dragInfo,
      selectedCells,
      toggleSelectAll,
      toggleSelectRow,
      subtotalField,
    } = useTable()

    let cellData = getCellData(rowIndex, columnIndex - 1)
    let isSubtotalTitle = false
    let isSubtotalTotal = false

    if (typeof cellData === 'object') {
      isSubtotalTitle = cellData.subtotal === 'title'
      isSubtotalTotal = cellData.subtotal === 'total'
      cellData = cellData.value
      console.log({ cellData, isSubtotalTotal, isSubtotalTitle })

    }

    if (columnIndex === 0) {

      return (
        <div
          className={clsx(
            classes.cell,
            classes.dataCell,
            selectedCells.has(rowIndex) && classes.isSelected,
            hoveredState[0] === rowIndex && classes.hoveredRowCell,
            hoveredState[1] === columnIndex && classes.hoveredColumnCell,
            isSubtotalTitle && classes.isSubtotalTitle,
            isSubtotalTotal && classes.isSubtotalTotal,
          )}
          style={style}
          onMouseOver={() => onHover(rowIndex, -1)}
        >
          {!isSubtotalTotal && (
            <Checkbox
              checked={selectedCells.has(rowIndex)}
              onChange={event => toggleSelectRow(rowIndex)}
            />
          )}
        </div>
      )
    }

    const column = columns[columnIndex - 1]

    const field_type = isSubtotalTotal
      ? (column.total ?? '')
      : isSubtotalTitle
      ? 'string'
      : column.field_type

    if (isSubtotalTotal) {
      console.log({ field_type, cellData })
    }

    const renderedCell = React.useMemo(
      () => renderCell(field_type, cellData),
      [cellData, field_type]
    )

    return (
      <div
        className={clsx(
          classes.cell,
          classes.dataCell,
          selectedCells.has(rowIndex) && classes.isSelected,
          hoveredState[0] === rowIndex && classes.hoveredRowCell,
          hoveredState[1] === columnIndex && classes.hoveredColumnCell,
          isSubtotalTitle && classes.isSubtotalTitle,
          isSubtotalTotal && classes.isSubtotalTotal,
        )}
        style={style}
        onMouseOver={() => onHover(rowIndex, columnIndex)}
      >
        {renderedCell}
      </div>
    )
  },

  //
  areEqual,
)

DataCell.propTypes = {

}

export { DataCell }
