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
import { colors } from '../../styles'



export const TotalCell = React.memo(
  ({ columnIndex, rowIndex, style }) => {

    const {
      classes,
      columns,
      onHover,
      getTotalData,
      hoveredState,
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

    const { value, label, align } = getTotalData(columnIndex - 1)
    const isLast = columnIndex === columns.length

    return (
      <div
        className={clsx(classes.cell, classes.totalCell, {
          [classes.isLast]: isLast,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
          [classes.hasContent]: Boolean(label),
        })}
        style={style}
        onMouseOver={() => onHover(-1, columnIndex)}
      >
        <div style={{ textAlign: align }}>
          <div className={classes.totalLabel}>{label}</div>
          <div>{value}</div>
        </div>
      </div>
    )
  },

  //
  areEqual,
)

TotalCell.propTypes = {

}
