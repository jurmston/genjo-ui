import React from 'react'
import PropTypes from 'prop-types'

import { areEqual } from 'react-window'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../colors'
import clsx from 'clsx'
import { useTable } from './context'


const useStyles = makeStyles(theme => ({
  roundTop: {},
  roundBottom: {},
  hoveredColumnCell: {},
  hoveredRowCell: {},
  isSelected: {},
  cell: {
    transition: 'background-color 300ms linear',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    '& > div': {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    borderBottom: 'none',
    padding: 4,
    textAlign: 'left',
    ...theme.typography.body2,

    '&$roundTop': {
      borderTopLeftRadius: theme.shape.borderRadius,
    },

    '&$roundBottom': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    '&$hoveredRowCell': {
      backgroundColor: colors.blueGrey[50],
    },

    '&$hoveredColumnCell': {
      backgroundColor: theme.palette.grey[100],

      '&$hoveredRowCell': {
        backgroundColor: colors.blueGrey[100],
        zIndex: 9999,
        overflow: 'visible',
        '& > div': {
          backgroundColor: colors.blueGrey[100],
          width: 'unset',
        }
      },
    },

    '&$isSelected': {
      backgroundColor: colors.amber[100],
    },

  },
}))


const DataCell = React.memo(
  ({ columnIndex, rowIndex, style, isFixed }) => {

    const classes = useStyles()
    const { getCellData, onHover, hoveredState, fixedColumnCount, dragInfo } = useTable()

    return (
      <div
        className={clsx(
          classes.cell,
          classes.dataCell,
          // selectedCells.has(rowIndex) && classes.isSelected,
          hoveredState[0] === rowIndex && classes.hoveredRowCell,
          hoveredState[1] === columnIndex && classes.hoveredColumnCell,
        )}
        style={style}
        onMouseOver={() => onHover(rowIndex, columnIndex)}
      >
        <div>
          {getCellData(rowIndex, columnIndex)}
        </div>
      </div>
    )
  },

  //
  areEqual,
)

DataCell.propTypes = {

}

const FixedDataCell = props => <DataCell {...props} isFixed />

export { DataCell, FixedDataCell }
