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


function renderTotalCell(field_type, value, label, labelClass) {
  if (!label) {
    return ''
  }

  switch (field_type) {
    case 'currency': {
      return (
        <div>
          <div className={labelClass} style={{ textAlign: 'right' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
            <span style={{ flex: 1 }}>$</span>
            <span>{Number(value).toFixed(2)}</span>
          </div>
        </div>
      )
    }

    case 'number': {
      return (
        <div style={{ textAlign: 'right' }}>
          <div className={labelClass}>{label}</div>
          <div>{Math.round((Number(value) + Number.EPSILON) * 100) / 100}</div>
        </div>
      )
    }

    case 'datetime': {
      return (
        <div style={{ textAlign: 'right' }}>
          <div className={labelClass}>{label}</div>
          <div>{DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)}</div>
        </div>
      )
    }

    case 'date': {
      return (
        <div style={{ textAlign: 'right' }}>
          <div className={labelClass}>{label}</div>
          <div>{DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)}</div>
        </div>
      )
    }

    default: {
      return (
        ''
      )
    }
  }
}



export const TotalCell = React.memo(
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
      totals,
    } = useTable()

    if (columnIndex === 0) {
      return (
        <div
          className={clsx(classes.totalCell, classes.isFirst)}
          style={style}
          onMouseOver={() => onHover(-1, columnIndex)}
        />
      )
    }

    const column = columns[columnIndex - 1]


    const { field_name } = column
    const { value = '', label = '', type = '' } = totals?.[field_name] ?? {}

    // Reminder: the column set length is 1 less than the grid column count.
    const isLast = columnIndex === columns.length

    const renderedCell = React.useMemo(
      () => renderTotalCell(type, value, label, classes.totalLabel),
      [type, value, label, classes.totalLabel]
    )


    return (
      <div
        className={clsx(
          classes.cell,
          classes.totalCell,
          Boolean(label) && classes.hasContent,
          isLast && classes.isLast,
        )}
        style={style}
        onMouseOver={() => onHover(-1, columnIndex)}
      >
        {renderedCell}
      </div>
    )
  },

  //
  areEqual,
)

TotalCell.propTypes = {

}
