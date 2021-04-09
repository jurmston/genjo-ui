import React from 'react'

import { useQuery, useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'


import { DataTable } from './DataTable'
import { useDimensions } from '../useDimensions'
import { useSelectionSet } from '../useSelectionSet'

import { colors } from '../styles'

import { DateTime } from 'luxon'


import {
  createDataTableTestData,
  companiesDefaultColumnSet,
} from './storybook-utils'

const TEST_DATA = createDataTableTestData(100)

export default {
  title: 'Widgets/DataTable',
  component: DataTable,
}


function renderCellData(field_type, cellData) {
  if (cellData === undefined) {
    return {
      isLoading: true,
    }
  }

  switch (field_type) {
    case 'currency': {
      return {
        align: 'right',
        value: <span>{`$${Number(cellData).toFixed(2)}`}</span>,
      }
    }

    case 'number': {
      return {
        value: Math.round((Number(cellData) + Number.EPSILON) * 100) / 100,
        align: 'right',
      }
    }

    case 'datetime': {
      return {
        value: DateTime.fromISO(cellData).toLocaleString(DateTime.DATETIME_SHORT),
        align: 'right',
      }
    }

    case 'date': {
      return {
        value: DateTime.fromISO(cellData).toLocaleString(DateTime.DATE_SHORT),
        align: 'right',
      }
    }

    case 'bool': {
      return {
        value: (
          <span>
            {cellData
              ? <CheckCircleIcon style={{ color: colors.green[500] }} />
              : <CancelIcon style={{ color: colors.red[500] }} />
            }
          </span>
        ),
        align: 'center',
      }
    }

    default: {
      return {
        value: <span>{cellData}</span>,
        align: 'left',
      }
    }
  }
}


function debounce(fn, delay = 250) {
  let interval
  let lastArgs
  let lastThis

  function debounced(...args) {
    clearTimeout(interval)
    lastArgs = args
    lastThis = this

    interval = setTimeout(
      () => {
        fn.apply(lastThis, lastArgs)
      },
      delay,
    )
  }

  return debounced
}


async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}

async function testTotalsApi() {
  await stall(Math.random() * 1000)

  return {
    data: TEST_DATA.metaData,
    status: 200,
    statusText: 'OK',
    headers: {},
  }
}


async function testSubtotalsApi(field) {
  await stall(Math.random() * 1000)

  return {
    data: TEST_DATA.subtotals[field],
    status: 200,
    statusText: 'OK',
    headers: {},
  }
}


async function testRecordsApi({ limit = 25, offset = 0, sortBy = '' }) {
  await stall(250)

  const records = [...TEST_DATA.records]

  if (sortBy) {
    const direction = sortBy.startsWith('-') ? 'DESC' : 'ASC'

    const sortParam = sortBy.replace('-', '')

    records.sort((a, b) => {
      const aParam = a?.[sortParam]
      const bParam = b?.[sortParam]

      if (aParam < bParam) {
        return direction === 'ASC' ? -1 : 1
      }

      if (aParam > bParam) {
        return direction === 'ASC' ? 1 : -1
      }

      return 0
    })
  }

  return {
    data: {
      limit,
      offset,
      results: records.slice(offset, offset + limit)
    },
    status: 200,
    statusText: 'OK',
    headers: {},
  }
}


const PrimaryInner = () => {
  const columns = companiesDefaultColumnSet.columns

  const [tableData, setTableData] = React.useState({
    count: 0,
    items: {},
  })

  const [rowCount, setRowCount] = React.useState(0)
  const [rows, setRows] = React.useState({})
  const [totals, setTotals] = React.useState({})
  const [subtotals, setSubtotals] = React.useState({})
  const [sortBy, setSortBy] = React.useState('')
  const [subtotalField, setSubtotalField] = React.useState('')

  const [metaData, setMetaData] = React.useState({
    count: 0,
    totals: {},
  })

  const [subtotalData, setSubtotalData] = React.useState({})

  const mockTotalsApi = async () => {
    const results = await testTotalsApi()

    return results?.data
  }

  const mockSubtotalsApi = async () => {
    const results = await testSubtotalsApi(subtotalField)

    return results?.data
  }

  const mockRecordsApi = async ({ pageParam = {} }) => {
    const { limit = 50, offset = 0 } = pageParam

    const adjustedLimit = Math.max(limit, 25)

    const results = await testRecordsApi({
      limit: adjustedLimit,
      offset,
      sortBy,
    })
    return results?.data
  }

  const {
    data,
    status,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['rows', sortBy],
    mockRecordsApi,
    {
      // enabled: false,
      onSuccess: result => {
        const newRows = {}

        result.pages.forEach(page => {
          const { offset } = page

          page.results.forEach((item, index) => {
            const rowIndex = offset + index
            newRows[rowIndex] = item
          })
        })

        setRows(newRows)
      }
    },
  )

  const { isLoading: isLoadingTotal } = useQuery(
    ['totals'],
    mockTotalsApi,
    {
      onSuccess: result => {
        setRowCount(result.count)
        setTotals(result.totals)
      },
    }
  )

  const { isLoading: isLoadingSubtotal } = useQuery(
    ['subtotals', subtotalField],
    mockSubtotalsApi,
    {
      enabled: Boolean(subtotalField),
      onSuccess: result => {
        const subtotalRows = {}
        Object.values(result).map(subtotalGroup => {
          subtotalRows[subtotalGroup.first] = {
            type: 'title',
            value: subtotalGroup.title,
            count: subtotalGroup.last - subtotalGroup.first + 1,
          }

          subtotalRows[subtotalGroup.last] = {
            type: 'subtotals',
            value: subtotalGroup.subtotals
          }
        })

        setSubtotalData(subtotalRows)
      },
    }
  )

  const {
    selected,
    toggleSelectAll,
    toggleSelectItem,
  } = useSelectionSet('', data?.count)

  const [tableContainerRef, tableContainerDimensions, ] = useDimensions()

  const tableContainerHeight = window.innerHeight
    - tableContainerDimensions.top
    - 16

  function getCellData(rowIndex, columnIndex) {
    const item = rows[rowIndex]
    const { field_name, field_type } = columns?.[columnIndex] ?? {}
    return renderCellData(field_type, item?.[field_name])
  }

  function getSubtotalData(rowIndex, columnIndex) {
    const result = subtotalData?.[rowIndex] ?? null

    if (!result) {
      return null
    }

    const { type, title, value } = result

    if (type === 'title') {
      return result
    }

    const { field_name: fieldName = '' } = columns?.[columnIndex] ?? {}
    const { type: totalType = '' } = totals?.[fieldName] ?? {}
    return {
      type: 'subtotals',
      ...renderCellData(totalType, value?.[fieldName]),
    }
  }

  function getHeaderData(columnIndex) {
    const { title = '', sort_type = '', align = 'left', field_name = '', subtotal = false } = columns?.[columnIndex] ?? {}
    return { title, sortType: sort_type, align, fieldName: field_name, hasSubtotal: subtotal }
  }

  function getTotalData(columnIndex) {
    const { field_name: fieldName = '' } = columns?.[columnIndex] ?? {}

    const { value = '', label = '', type = '' } = totals?.[fieldName] ?? {}

    return {
      ...renderCellData(type, value),
      label,
    }
  }

  function onItemsRendered({
    overscanRowStartIndex,
    overscanRowStopIndex,
  }) {
    let minUnloadedRecord = Infinity
    let maxUnloadedRecord = -1
    let hasUnloadedRecord = false

    for (let i = overscanRowStartIndex; i < overscanRowStopIndex; i += 1) {
      if (rows[i] === undefined) {
        hasUnloadedRecord = true
        minUnloadedRecord = Math.min(minUnloadedRecord, i)
        maxUnloadedRecord = Math.max(maxUnloadedRecord, i)
      }
    }

    if (hasUnloadedRecord) {
      const limit = maxUnloadedRecord - minUnloadedRecord
      const offset = minUnloadedRecord

      fetchNextPage({ pageParam: { limit, offset }})
    }
  }

  const debouncedOnItemsRendered = React.useCallback(
    debounce(onItemsRendered),
    [rows, fetchNextPage]
  )

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
        totals={totals}
        getCellData={getCellData}
        getHeaderData={getHeaderData}
        getSubtotalData={getSubtotalData}
        rowCount={rowCount}
        selectedCells={selected}
        onItemsRendered={debouncedOnItemsRendered}
        toggleSelectRow={toggleSelectItem}
        toggleSelectAll={toggleSelectAll}
        isLoading={isLoading || isLoadingTotal || isLoadingSubtotal}
        isFetching={isFetching}
        overscanRowCount={10}
        sortBy={sortBy}
        setSortBy={setSortBy}
        subtotalField={subtotalField}
        setSubtotalField={setSubtotalField}
        getTotalData={getTotalData}
      />
    </div>
  )
}


function withQueryClient(Component, props) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Component {...props} />
    </QueryClientProvider>
  )
}

export const Primary = props => withQueryClient(PrimaryInner, props)
