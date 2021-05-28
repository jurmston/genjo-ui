import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import ButtonBase from '@material-ui/core/ButtonBase'
import ArrowDownIcon from '@material-ui/icons/ArrowBack'

import { useDataTable } from './DataTableDeux'
import { Button } from '@material-ui/core'


const ROW_HEIGHT = 36


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
    sortIcon: SortIcon,
    isSortable = false,
    hasSubtotals,
  } = columns[index]

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
