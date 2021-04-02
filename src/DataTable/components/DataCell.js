import React from 'react'
import PropTypes from 'prop-types'
import { areEqual } from 'react-window'
import Checkbox from '@material-ui/core/Checkbox'
import Skeleton from '@material-ui/core/Skeleton'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { useTable } from '../context'


const DataCell = React.memo(
  ({ columnIndex, rowIndex, style }) => {

    const {
      classes,
      columns,
      getCellData,
      onHover,
      hoveredState,
      selectedCells,
      toggleSelectRow,
    } = useTable()

    const {
      align = 'left',
      value = <Typography>cellulaticular rapitious oligiosis noodles</Typography>,
      isLoading = false,
      isCheckbox = false,
    } = columnIndex === 0
      ?  { isCheckbox: true }
      : React.useMemo(
        () => getCellData(rowIndex, columnIndex - 1),
        [rowIndex, columnIndex]
      )

    return (
      <div
        className={clsx(classes.cell, {
          [classes.isSelected]: selectedCells.has(rowIndex),
          [classes.hoveredRowCell]: hoveredState[0] === rowIndex,
          [classes.hoveredColumnCell]: hoveredState[1] === columnIndex,
        })}
        style={{
          ...style,
          textAlign: align,
        }}
        onMouseOver={() => onHover(rowIndex, -1)}
      >
        {isCheckbox ? (
          <Checkbox
            checked={selectedCells.has(rowIndex)}
            onChange={event => toggleSelectRow(rowIndex)}
          />
        ) : isLoading
          ? <Skeleton variant="text" />
          : value
        }
      </div>
    )
  },

  // Check for memoization equality
  areEqual,
)

DataCell.propTypes = {

}

export { DataCell }
