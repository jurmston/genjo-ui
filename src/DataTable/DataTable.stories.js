import React from 'react'

import { useQuery, useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'

import useDimensions from '../useDimensions'
import { DataTable } from './DataTable'
import createApiClient from '../DataTable_OLD/mocks/api'
import useSelectionSet from '../useSelectionSet'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import EditIcon from '@material-ui/icons/Edit'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderRounded'

export default {
  title: 'Widgets/DataTable',
  component: DataTable,
}

const apiClient = createApiClient({ recordCount: 10000, latency: 'none' })

// const TEST_DATA = createDataTableTestData(100)


const columnData = [
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

const PrimaryInner = () => {
  const [tableContainerRef, tableContainerDimensions] = useDimensions()
  const tableContainerHeight = window.innerHeight - tableContainerDimensions.top - 16

  const [rowCount, setRowCount] = React.useState(0)
  const [rows, setRows] = React.useState({})
  const [totals, setTotals] = React.useState({})
  const [subtotalField, setSubtotalField] = React.useState()

  const [sortBy, setSortBy] = React.useState('')


  const [columns, setColumns] = React.useState(columnData)

  const { selected, mode, toggle, toggleMode, selectMany, unselectMany } = useSelectionSet([sortBy, columns])

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

  const { isLoading: isLoadingTotals, isFetching: isFetchingTotals } = useQuery(
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

  function renderPerson(rowIndex, row) {
    if (!row?.primary_contact) {
      return ''
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          style={{
            height: 24,
            width: 24,
            backgroundColor: row?.primary_contact?.color ?? 'unset',
            fontSize: 14,
            marginRight: 8,
          }}
          src={row?.primary_contact?.avatar}
        >
          {row?.primary_contact?.fullName?.[0]}
        </Avatar>

        <a href="https://www.example.com">
          {row?.primary_contact?.fullName ?? ''}
        </a>
      </div>
    )
  }


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

  function renderActions(rowIndex, rowData) {
    return (
      <>
        <IconButton onClick={event => { event.stopPropagation() }}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={event => { event.stopPropagation() }}>
          <FavoriteIcon />
        </IconButton>

        <IconButton onClick={event => { event.stopPropagation() }}>
          <RemoveCircleIcon />
        </IconButton>
      </>
    )
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
        isFetching={isFetching || isFetchingTotals}
        isLoading={isLoading || isLoadingTotals}
        rowCount={rowCount}
        rows={rows}
        containerHeight={tableContainerHeight}
        containerWidth={tableContainerDimensions.width}
        columns={columns}
        setColumns={setColumns}
        totals={totals}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onItemsRendered={onItemsRendered}
        selected={selected}
        selectionMode={mode}
        toggleSelected={toggle}
        toggleSelectionMode={toggleMode}
        selectMany={selectMany}
        unselectMany={unselectMany}
        customRenderers={{
          person: renderPerson,
        }}
        actionsWidth={200}
        renderActions={renderActions}
        onColumnResize={(indexToChange, newWidth) => {
          setColumns(
            columns.map((column, index) => indexToChange === '__ALL__' || index === indexToChange
              ? { ...column, width: newWidth }
              : column
            )
          )
        }}
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
