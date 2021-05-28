import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import ButtonBase from '@material-ui/core/ButtonBase'
import ArrowDownIcon from '@material-ui/icons/ArrowBack'

import { useDataTable } from './useDataTable'
import { Button } from '@material-ui/core'

import renderCell from './utils/renderCell'


const ROW_HEIGHT = 36


export const TotalCell = ({ type, label, value, column }) => {

  const {
    width = 0,
    align = 'left',
  } = column

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        "GenjoDataTable__cell",
        "GenjoDataTable__total-cell",
      )}
      style={{
        width: width,
        maxWidth: width,
        minWidth: width,
        textAlign: align,
      }}
    >
      <span className="GenjoDataTable__total-label">
        {label}
      </span>

      <span>
        {renderCell(type, value)}
      </span>
    </div>
  )
}

TotalCell.propTypes = {

}
