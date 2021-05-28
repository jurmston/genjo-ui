import * as React from 'react'
import PropTypes from 'prop-types'

import { Row } from './Row'


export const DataWindow = ({
  rowCount,
  topRow,
  bottomRow,
  rowHeight,
  actionsWidth,
  scrollbarWidth,
}) => {

  const rows = []
  for (let index = topRow; index <= bottomRow; index += 1) {
    rows.push(
      <Row
        key={index}
        rowIndex={index}
        top={index * rowHeight}
        rowHeight={rowHeight}
        actionsWidth={actionsWidth}
        scrollbarWidth={scrollbarWidth}
      />
    )
  }

  const totalHeight = rowCount * rowHeight

  return (
    <div
      className="GenjoDataTable__scroll-container"
      style={{
        height: totalHeight,
        maxHeight: totalHeight,
        minHeight: totalHeight,
      }}
    >
      {rows}
    </div>
  )
}

DataWindow.propTypes = {

}
