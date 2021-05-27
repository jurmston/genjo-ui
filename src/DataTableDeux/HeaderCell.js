import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import ArrowDownIcon from '@material-ui/icons/ArrowBack'

import { useDataTable } from './DataTableDeux'


export const HeaderCell = ({ index, column }) => {

  const { isResizing, startResizing, columns } = useDataTable()

  const width = columns[index]?.width ?? 0

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx("GenjoDataTable__cell", "GenjoDataTable__header-cell")}
      style={{
        width: width,
        maxWidth: width,
        minWidth: width,
        pointerEvents: isResizing ? 'none' : 'unset',
      }}
        // ...style,
    >
      <span
        className="GenjoDataTable__title"
        style={{ textAlign: column.align, width: width - 12 }}
      >
        {column.title}
      </span>

      {/*}
        {isSortable && (isHovered || isSelected) && Boolean(SortIcon) && (
          <ArrowDownIcon />
        )}*/}

      <div
        role="button"
        onMouseDown={event => startResizing(event, index)}
        className="GenjoDataTable__resize-handle"
      />
    </div>
  )
}

HeaderCell.propTypes = {

}
