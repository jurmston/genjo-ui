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


function renderCell(column, cellData) {
  if (cellData === '__loading__') {
    return (
      <div><Skeleton variant="text" /></div>
    )

  }

  switch (column.field_type) {
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
        <div>
          {DateTime.fromISO(cellData).toLocaleString(DateTime.DATETIME_SHORT)}
        </div>
      )
    }

    case 'date': {
      return (
        <div>
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
    } = useTable()

    if (columnIndex === 0) {

      return (
        <div
          className={clsx(
            classes.cell,
            classes.dataCell,
            selectedCells.has(rowIndex) && classes.isSelected,
            hoveredState[0] === rowIndex && classes.hoveredRowCell,
            hoveredState[1] === columnIndex && classes.hoveredColumnCell,
          )}
          style={style}
          onMouseOver={() => onHover(rowIndex, -1)}
        >
          <Checkbox
            checked={selectedCells.has(rowIndex)}
            onChange={event => toggleSelectRow(rowIndex)}
          />
        </div>
      )
    }

    const cellData = getCellData(rowIndex, columnIndex - 1)

    const column = columns[columnIndex - 1]

    const renderedCell = React.useMemo(
      () => renderCell(column, cellData),
      [cellData, column.field_type]
    )

    return (
      <div
        className={clsx(
          classes.cell,
          classes.dataCell,
          selectedCells.has(rowIndex) && classes.isSelected,
          hoveredState[0] === rowIndex && classes.hoveredRowCell,
          hoveredState[1] === columnIndex && classes.hoveredColumnCell,
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
