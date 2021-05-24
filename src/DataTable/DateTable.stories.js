import React from 'react'
import { useQuery, useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'

import DataTable from './DataTable'
import useDimensions from '../useDimensions'
import useSelectionSet from '../useSelectionSet'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'
import AddCircleIcon from '@material-ui/icons/AddCircleOutline'

import { createDataTableTestData, testColumns } from './storybook-utils'

import createApiClient from './mocks/api'
const apiClient = createApiClient(10000, 'none')

const TEST_DATA = createDataTableTestData(100)

export default {
  title: 'Widgets/DataTable',
  component: DataTable,
}


function debounce(fn, delay = 250) {
  let interval
  let lastArgs
  let lastThis

  function debounced(...args) {
    clearTimeout(interval)
    lastArgs = args
    lastThis = this

    interval = setTimeout(() => {
      fn.apply(lastThis, lastArgs)
    }, delay)
  }

  return debounced
}

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
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



const PrimaryInner = () => {
  const columnSet = testColumns

  const [rowCount, setRowCount] = React.useState(0)
  const [rows, setRows] = React.useState({})
  const [totals, setTotals] = React.useState({})
  const [subtotalField, setSubtotalField] = React.useState()

  const [sortBy, setSortBy] = React.useState('')


  const [columns, setColumns] = React.useState([])

  const { selected, mode, toggle, selectAll, unselectAll } = useSelectionSet([sortBy, columns])
  console.log({ selected, mode })

  const [excludedIds, setExcludedIds] = React.useState(new Set())

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

  const idsString = [...excludedIds].join(',')
  const excludedIdsKey = showingHidden ? undefined : idsString
  const hiddenIdsKey = showingHidden ? idsString : undefined

  const unhideRecords = () => setExcludedIds(new Set())

  const ref = React.useRef()

  React.useEffect(
    () => {
      setColumns([
        {
          type: 'checkbox',
          dataKey: '',
        },

        ...columnSet.map(column => {
          const result = {
            ...column,
            width: 150,
          }

          if (totals[column.dataKey]) {
            const { value: totalValue, label: totalLabel, type: totalType } = totals[column.dataKey]
            result.totalValue = totalValue
            result.totalLabel = totalLabel
            result.totalType = totalType
          }

          return result
        }),

        {
          type: 'actions',
        },
      ])
    },
    [columnSet, totals, sortBy]
  )

  const [subtotalData, setSubtotalData] = React.useState({})

  const mockTotalsApi = async () => {
    const results = await apiClient.getTotals({
      excludedIds: showingHidden ? undefined : [...excludedIds],
      ids: showingHidden ? [...excludedIds] : undefined,
    })

    return results?.data
  }

  const mockSubtotalsApi = async () => {
    const results = await testSubtotalsApi(subtotalField)

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

  // React.useEffect(
  //   () => {
  //     console.log({ rows, ref })
  //     ref?.current?.resetAfterColumnIndex?.(0, true)
  //   },
  //   [rows, ref]
  // )

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

  // Subtotal row data:
  //   title: {
  //     rowType: 'title',
  //     title: string,
  //     count: number,
  //   },
  //
  //   subtotals: {
  //      rowType: 'subtotals',
  //      values: {/subtotal data/},
  //   }
  const { isLoading: isLoadingSubtotal } = useQuery(['subtotals', subtotalField], mockSubtotalsApi, {
    enabled: Boolean(subtotalField),
    onSuccess: result => {
      const subtotalRows = {}
      Object.values(result).map(subtotalGroup => {
        subtotalRows[subtotalGroup.first] = {
          subtotalType: 'title',
          subtotalTitle: subtotalGroup.title,
          subtotalCount: subtotalGroup.last - subtotalGroup.first + 1,
        }

        subtotalRows[subtotalGroup.last] = {
          subtotalType: 'value',
          subtotalValues: subtotalGroup.subtotals,
        }
      })

      setSubtotalData(subtotalRows)
    },
  })



  const [tableContainerRef, tableContainerDimensions] = useDimensions()

  const tableContainerHeight = window.innerHeight - tableContainerDimensions.top - 16

  function onItemsRendered({ overscanRowStartIndex, overscanRowStopIndex }) {
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

      fetchNextPage({ pageParam: { limit, offset } })
    }
  }

  const debouncedOnItemsRendered = React.useCallback(debounce(onItemsRendered), [rows, fetchNextPage])

  function renderPerson(row) {
    const value = row?.primary_contact

    if (!value) {
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
            backgroundColor: value?.color ?? 'unset',
            fontSize: 14,
            marginRight: 8,
          }}
          src={value?.avatar}
        >
          {value?.fullName?.[0]}
        </Avatar>

        <a href="https://www.example.com">
          {value?.fullName ?? ''}
        </a>
      </div>
    )
  }


  const onEditClick = React.useCallback(
    (event, rowIndex) => {
      console.log(`Editing: ${rowIndex}`)
    },
    [rows],
  )

  const onRemoveClick = React.useCallback(
    (event, rowIndex) => {
      if (showingHidden) {
        unhideRecord(rows[rowIndex]?.id)
      } else {
        excludeRecord(rows[rowIndex]?.id)
      }
    },
    [rows, showingHidden]
  )

  const onRowClick = React.useCallback(
    (event, rowIndex) => {
      console.log(`Clicked: ${rowIndex}`)
    },
    [rows]
  )

  const onRowSelect = React.useCallback(
    (event, rowIndex) => {
      const newRows = [...rows]

      newRows[rowIndex] = {
        ...newRows[rowIndex],
        __isSelected: !newRows[rowIndex]?.__isSelected,
      }

      setRows(newRows)
    },
    [rows]
  )

  return (
    <>
      {/* TOOLBAR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography>{`Total: ${rowCount}`}</Typography>
        <Typography>{`Loaded: ${Object.keys(rows).length}`}</Typography>
        <Typography onClick={unhideRecords}>
          {`Hidden: ${excludedIds.size}`}
        </Typography>
        <Button onClick={() => setShowingHidden(!showingHidden)}>
          {showingHidden ? 'OMITTED' : 'MAIN'}
        </Button>
      </div>

      <div
        ref={tableContainerRef}
        style={{
          width: '100%',
          height: tableContainerHeight,
          overflowY: 'hidden',
        }}
      >
        <DataTable
          dataGridRef={ref}
          containerHeight={tableContainerHeight}
          containerWidth={tableContainerDimensions.width}

          columnData={columns}
          rowData={rows}
          subtotalData={subtotalData}

          hasTotals={true}
          totalData={totals}
          isLoadingTotals={isLoadingTotals}

          rowCount={rowCount}
          onItemsRendered={debouncedOnItemsRendered}
          isLoading={isLoading || isLoadingTotals || isLoadingSubtotal}
          isFetching={isFetching}
          overscanRowCount={10}

          onRowSelect={onRowSelect}
          onRowClick={onRowClick}

          selector={{
            selected,
            selectAll,
            unselectAll,
            mode,
            toggle,
            key: 'id',
          }}

          sorting={{
            key: sortBy.replace('-', ''),
            direction: sortBy.startsWith('-') ? 'DESC' : 'ASC',
            setSortingKey: sortingKey => setSortBy(
              sortBy === sortingKey ? `-${sortingKey}` : sortingKey
            ),
          }}

          subtotals={{
            key: subtotalField,
            setSubtotalKey: subtotalKey => setSubtotalField(
              subtotalField === subtotalKey ? '' : subtotalKey
            ),
          }}

          customRenderers={{
            person: renderPerson,
          }}

          actions={[
            {
              icon: <EditIcon />,
              onClick: onEditClick,
              title: 'Edit Company',
            },
            {
              icon: showingHidden ? <AddCircleIcon /> : <RemoveCircleIcon />,
              onClick: onRemoveClick,
              title: showingHidden ? 'Hide record' : 'Show record',
            }
          ]}
        />
      </div>
    </>
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
