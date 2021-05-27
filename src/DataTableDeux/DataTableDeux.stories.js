import React from 'react'

import { useQuery, useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'

import useDimensions from '../useDimensions'
import { DataTableDeux } from './DataTableDeux'
import { createDataTableTestData } from '../DataTable/storybook-utils'
import createApiClient from '../DataTable/mocks/api'
import useSelectionSet from '../useSelectionSet'


export default {
  title: 'Components/DataTableDeux',
  component: DataTableDeux,
}

const apiClient = createApiClient(100, 'none')

// const TEST_DATA = createDataTableTestData(100)


const columns = [
  {
    dataKey: 'name',
    type: 'string',
    title: 'Name',
    isSortable: true,
    width: 250,
  },
  {
    dataKey: 'discipline',
    type: 'string',
    title: 'Discipline',
    isSortable: true,
    hasSubtotals: true,
    width: 150,
  },
  {
    dataKey: 'is_active',
    type: 'bool',
    title: 'Active',
    isSortable: true,
    width: 75,
  },
  {
    dataKey: 'primary_contact',
    type: 'person',
    title: 'Primary Contact',
    isSortable: true,
    width: 150,
  },
  {
    dataKey: 'amount',
    type: 'currency',
    title: 'Amount',
    isSortable: true,
    width: 150,
  },
  {
    dataKey: 'count',
    type: 'number',
    title: 'Count',
    isSortable: true,
    width: 150,
  },
  {
    dataKey: 'size',
    type: 'number',
    title: 'Size',
    width: 150,
  },
  {
    dataKey: 'modified',
    type: 'datetime',
    title: 'Modified',
    isSortable: true,
    width: 150,
  },
]

export const PrimaryInner = () => {
  const [tableContainerRef, tableContainerDimensions] = useDimensions()
  const tableContainerHeight = window.innerHeight - tableContainerDimensions.top - 16

  const [rowCount, setRowCount] = React.useState(0)
  const [rows, setRows] = React.useState({})
  const [totals, setTotals] = React.useState({})
  const [subtotalField, setSubtotalField] = React.useState()

  const [sortBy, setSortBy] = React.useState('')


  // const [columns, setColumns] = React.useState([])

  const { selected, mode, toggle, toggleMode } = useSelectionSet([sortBy, columns])

  const excludeRecord = idToExclude => {
    const newExcludedIds = new Set(excludedIds)
    newExcludedIds.add(idToExclude)
    setExcludedIds(newExcludedIds)
  }

  const unhideRecord = idToUnhide => {
    const newExcludedIds = new Set(excludedIds)
    newExcludedIds.delete(idToUnhide)
    setExcludedIds(newExcludedIds)
  }

  const [showingHidden, setShowingHidden] = React.useState(false)

  const [excludedIds, setExcludedIds] = React.useState(new Set())

  const idsString = [...excludedIds].join(',')
  const excludedIdsKey = showingHidden ? undefined : idsString
  const hiddenIdsKey = showingHidden ? idsString : undefined

  const mockTotalsApi = async () => {
    const results = await apiClient.getTotals({
      excludedIds: showingHidden ? undefined : [...excludedIds],
      ids: showingHidden ? [...excludedIds] : undefined,
    })

    return results?.data
  }

  const mockRecordsApi = async ({ pageParam = {} }) => {
    const { limit = 50, offset = 0 } = pageParam

    const adjustedLimit = Math.max(limit, 25)

    const results = await apiClient.getRecords({
      limit: adjustedLimit,
      offset,
      sortBy,
      excludedIds: showingHidden ? undefined : [...excludedIds],
      ids: showingHidden ? [...excludedIds] : undefined,
    })

    return results?.data
  }

  const { isLoading: isLoadingTotals } = useQuery(
    ['totals', excludedIdsKey, hiddenIdsKey],
    mockTotalsApi,
    {
      enabled: Boolean(apiClient),
      onSuccess: result => {
        setRowCount(result.count)
        setTotals(result.totals)
    },
  })

  const { isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    ['rows', sortBy, excludedIdsKey, hiddenIdsKey],
    mockRecordsApi,
    {
      enabled: Boolean(apiClient),
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
      },
    }
  )

  function onItemsRendered({ topRow, bottomRow }) {
    let minUnloadedRecord = Infinity
    let maxUnloadedRecord = -1
    let hasUnloadedRecord = false

    for (let i = topRow; i <= bottomRow; i += 1) {
      if (rows[i] === undefined) {
        hasUnloadedRecord = true
        minUnloadedRecord = Math.min(minUnloadedRecord, i)
        maxUnloadedRecord = Math.max(maxUnloadedRecord, i)
      }
    }

    if (hasUnloadedRecord) {
      const limit = maxUnloadedRecord - minUnloadedRecord
      const offset = minUnloadedRecord

      fetchNextPage({ pageParam: { limit, offset } })
    }
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
      <DataTableDeux
        isFetching={isFetching}
        isLoading={isLoading}
        rowCount={rowCount}
        rows={rows}
        containerHeight={tableContainerHeight}
        containerWidth={tableContainerDimensions.width}
        columns={columns}
        onItemsRendered={onItemsRendered}
        selected={selected}
        selectionMode={mode}
        toggleSelected={toggle}
        toggleSelectionMode={toggleMode}
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
