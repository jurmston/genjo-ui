import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import ButtonBase from '@mui/material/ButtonBase'
import AscIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import DescIcon from '@mui/icons-material/KeyboardArrowUpRounded'

import { useDataTable } from './useDataTable'


export const HeaderCell = ({ index, column }) => {

  const {
    isResizing,
    startResizing,
    columns,
    sortBy = '',
    setSortBy,
  } = useDataTable()

  const {
    dataKey,
    width = 0,
    align = 'left',
    title = '',
    isSortable = false,
    hasSubtotals,
  } = columns[index]

  const SortIcon = sortBy.startsWith('-') ? DescIcon : AscIcon

  const clickProps = {}

  const isClickable = isSortable || hasSubtotals

  const isSelected = sortBy.startsWith('-')
    ? sortBy.slice(1) === dataKey
    : sortBy === dataKey

  if (isSortable) {
    clickProps.onClick = () => isSelected
      ? setSortBy(sortBy.startsWith('-') ? dataKey : `-${dataKey}`)
      : setSortBy(dataKey)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        "GenjoDataTable__cell",
        "GenjoDataTable__header-cell",
        {
          "is-selected": isSelected,
        }
      )}
      style={{
        width: width,
        maxWidth: width,
        minWidth: width,
        pointerEvents: isResizing ? 'none' : 'unset',
        cursor: isClickable ? 'pointer' : 'unset',
      }}
      {...clickProps}
    >
      <div
        className="GenjoDataTable__title-container"
        style={{
          justifyContent: column.align === 'left'
            ? 'flex-start'
            : column.align === 'right'
            ? 'flex-end'
            : 'center',
          width: width - 16,
        }}
      >
        <span className="GenjoDataTable__title">
          {column.title}
        </span>

        {isSortable && Boolean(SortIcon) && (
          <SortIcon className={"GenjoDataTable__sort-icon"} />
        )}
      </div>

      <ButtonBase
        onMouseDown={event => startResizing(event, index)}
        className="GenjoDataTable__resize-handle"
      />
    </div>
  )
}

HeaderCell.propTypes = {

}
