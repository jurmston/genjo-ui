import React from 'react'

import { DataTable } from './DataTable'
import { useDimensions } from '../useDimensions'
import { useSelectionSet } from '../useSelectionSet'

import {
  createDataTableTestData,
  companiesDefaultColumnSet,
} from './storybook-utils'


const TEST_DATA = createDataTableTestData(10000)

export default {
  title: 'Components/DataTable',
  component: DataTable,
}


export const Primary = () => {
  const cellData = TEST_DATA
  const columns = companiesDefaultColumnSet.columns

  const {
    selected,
    toggleSelectAll,
    toggleSelectItem,
  } = useSelectionSet('', cellData.length)

  const [tableContainerRef, tableContainerDimensions, ] = useDimensions()

  const tableContainerHeight = window.innerHeight
    - tableContainerDimensions.top
    - 16

  function getCellData(rowIndex, columnIndex) {
    const field_name = columns?.[columnIndex]?.field_name

    return cellData?.[rowIndex]?.[field_name]
  }

  return (
    <div
      ref={tableContainerRef}
      style={{
        width: '100%',
        height: tableContainerHeight,
        overflowY: 'hidden',
      }}
    >
      <DataTable
        height={tableContainerHeight}
        width={tableContainerDimensions.width}
        columns={columns}
        getCellData={getCellData}
        rowCount={cellData.length}
        selectedCells={selected}
        toggleSelectRow={toggleSelectItem}
        toggleSelectAll={toggleSelectAll}
      />
    </div>
  )
}