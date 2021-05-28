import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Checkbox from '../Checkbox'

import { HeaderCell } from './HeaderCell'
import { AutoSizeButton } from './AutoSizeButton'
import { DensityButton } from './DensityButton'

const HEADER_HEIGHT = 48


export const Header = React.memo(
  ({
    columns,
    selected,
    selectionMode,
    toggleSelectionMode,
    rowDensity,
    setRowDensity,
    autoSizeColumns,
    rowHeight,
    actionsWidth,
    isLoading,
  }) => {
    if (isLoading) {
      return (
        <div
          className={clsx(
            'GenjoDataTable__row',
            'GenjoDataTable__header-row',
          )}
          style={{ height: rowDensity === 'dense' ? 48 : 56 }}
        />
      )
    }

    return (
      <div
        className={clsx(
          'GenjoDataTable__row',
          'GenjoDataTable__header-row',
        )}
        style={{ height: rowDensity === 'dense' ? 48 : 56 }}
      >

        <div
          className="GenjoDataTable__cell"
          style={{ width: rowHeight, maxWidth: rowHeight, minWidth: rowHeight }}
        >
          <Checkbox
            indeterminate={selected.size > 0}
            checked={selectionMode === 'exclude'}
            onClick={toggleSelectionMode}
          />
        </div>

        {columns.map((column, index) => (
          <HeaderCell
            index={index}
            key={column.dataKey}
            column={column}
          />
        ))}

        {actionsWidth > 0 && (
          <div
            className="GenjoDataTable__actions"
            style={{
              width: actionsWidth,
              minWidth: actionsWidth,
              maxWdth: actionsWidth,
              height: HEADER_HEIGHT,
              textAlign: 'center',
            }}
          >
            <AutoSizeButton autoSizeColumns={autoSizeColumns} />
            <DensityButton rowDensity={rowDensity} setRowDensity={setRowDensity} />
          </div>
        )}
      </div>
    )
  },
)

Header.displayName = 'Header'

Header.propTypes = {

}
