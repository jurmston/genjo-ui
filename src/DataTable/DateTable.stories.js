import React from 'react'

import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'

import { DataTable } from './DataTable'
import { useDimensions } from '../useDimensions'
import { useSelectionSet } from '../useSelectionSet'

import Button from '@material-ui/core/Button'

import InfiniteLoader from 'react-window-infinite-loader'

import { simpleRange } from '../utils/arrays'

import { useDebounce } from '../useDebounce'

import {
  createDataTableTestData,
  companiesDefaultColumnSet,
} from './storybook-utils'

const TEST_DATA = createDataTableTestData(10000)

export default {
  title: 'Components/DataTable',
  component: DataTable,
}


function debounce(fn, delay = 250) {
  let interval
  let lastArgs
  let lastThis

  console.log('Setup')

  function debounced(...args) {
    clearTimeout(interval)
    lastArgs = args
    lastThis = this

    console.log(`Called: ${args}`)

    interval = setTimeout(
      () => {
        console.log(`Executed`)
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

async function testApi({ limit = 25, offset = 0, sortBy = '' }) {
  console.log(`API CALLED: ${limit}, ${offset}, ${sortBy}`)
  await stall(250)

  if (sortBy) {
    const direction = sortBy.startsWith('-') ? 'DESC' : 'ASC'

    const sortParam = sortBy.replace('-', '')

    console.log({ direction })

    TEST_DATA.sort((a, b) => {
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

  const remaining = Math.max(Math.min(10000 - offset, limit), 0)

  return {
    data: {
      count: 10000,
      limit,
      offset,
      results: TEST_DATA.slice(offset, offset + limit)
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

  const [sortBy, setSortBy] = React.useState('')

  // const [queryQueue, setQueryQueue] = React.useState([])
  // const debouncedQueryQueue = useDebounce(queryQueue)

  // console.log(debouncedQueryQueue)

  const mockApi = async ({ pageParam = {} }) => {
    const { limit = 50, offset = 0 } = pageParam

    const adjustedLimit = Math.max(limit, 25)

    const results = await testApi({
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
    ['items', sortBy],
    mockApi,
    {
      // enabled: false,
    },
  )

  console.log({ data })

  React.useEffect(
    () => {
      if (!data) {
        setTableData({
          count: 0,
          items: {},
        })
      } else {
        let newCount = 0
        const newItems = {}

        data.pages.forEach(page => {
          const { count, offset } = page
          newCount = count

          page.results.forEach((item, index) => {
            const rowIndex = offset + index
            newItems[rowIndex] = item
          })
        })

        setTableData({
          count: newCount,
          items: newItems,
        })
      }
    },
    [data]
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
    const item = tableData.items[rowIndex]

    if (item === undefined) {
      return '__loading__'
    }

    const field_name = columns?.[columnIndex]?.field_name
    return item?.[field_name] ?? ''
  }

  function onItemsRendered({
    overscanRowStartIndex,
    overscanRowStopIndex,
  }) {
    let minUnloadedRecord = Infinity
    let maxUnloadedRecord = -1
    let hasUnloadedRecord = false

    for (let i = overscanRowStartIndex; i < overscanRowStopIndex; i += 1) {
      if (tableData.items[i] === undefined) {
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
    [tableData, fetchNextPage]
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
        getCellData={getCellData}
        rowCount={tableData.count}
        selectedCells={selected}
        onItemsRendered={debouncedOnItemsRendered}
        toggleSelectRow={toggleSelectItem}
        toggleSelectAll={toggleSelectAll}
        isLoading={isLoading}
        isFetching={isFetching}
        overscanRowCount={10}
        sortBy={sortBy}
        setSortBy={setSortBy}
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
