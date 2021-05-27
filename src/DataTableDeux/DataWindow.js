import * as React from 'react'
import PropTypes from 'prop-types'

import { Row } from './Row'

const ROW_HEIGHT = 36


export const DataWindow = ({ rowCount, topRow, bottomRow }) => {

  const rows = []
  for (let index = topRow; index <= bottomRow; index += 1) {
    rows.push(
      <Row
        key={index}
        rowIndex={index}
        top={index * ROW_HEIGHT}
      />
    )
  }

  const totalHeight = rowCount * ROW_HEIGHT

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
