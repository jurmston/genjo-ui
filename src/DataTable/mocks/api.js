import * as React from 'react'

import {
  createDataSet,
  calculateTotals,
} from './data'
import getRandomUser from '../../../.storybook/utils/getRandomUser'


async function stall(latency) {
  const baseStallTime = latency === 'slow'
    ? 500
    : latency === 'fast'
    ? 100
    : 0

  const stallTime = Math.random() * baseStallTime

  await new Promise(resolve => setTimeout(resolve, stallTime))
}

async function testTotalsApi(data, ) {
  await stall(Math.random() * 1000)

  return {
    data: DATA_SET.metaData,
    status: 200,
    statusText: 'OK',
    headers: {},
  }
}

async function testSubtotalsApi(field) {
  await stall(Math.random() * 1000)

  return {
    data: DATA_SET.subtotals[field],
    status: 200,
    statusText: 'OK',
    headers: {},
  }
}


const sortRecords = (direction, sortParam) => (a, b) => {
  const aParam = sortParam === 'primary_contact'
    ? a?.[sortParam]?.fullName
    : a?.[sortParam]

  const bParam = sortParam === 'primary_contact'
    ? b?.[sortParam]?.fullName
    : b?.[sortParam]

  if (aParam < bParam) {
    return direction === 'ASC' ? -1 : 1
  }

  if (aParam > bParam) {
    return direction === 'ASC' ? 1 : -1
  }

  return 0
}




function createApiClient({ recordCount = 100, latency = 'none' }) {

  const data = createDataSet(recordCount)

  function _filterRecords({ excludedIds, ids }) {
    const excludedIdsSet = new Set(excludedIds)
    const idsSet = new Set(ids)

    const records = [...data].filter(record => {
      if (excludedIds !== undefined && excludedIdsSet.has(record.id)) {
        return false
      }

      if (ids !== undefined && !idsSet.has(record.id)) {
        return false
      }

      return true
    })

    return records
  }

  /**
   * get the total and meta info for a given query.
   * @param {*} param0
   * @returns
   */
  async function getTotals({ excludedIds, ids }) {
    await stall(latency) * 2

    const records = _filterRecords({ excludedIds, ids })

    return {
      data: {
        totals: calculateTotals(records),
        count: records.length,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
    }
  }

  /**
   * Get all the records that match given query.
   * @param {*} param0
   * @returns
   */
  async function getRecords({ limit = 25, offset = 0, sortBy = '', excludedIds, ids }) {
    await stall(latency)

    const records = _filterRecords({ excludedIds, ids })

    if (sortBy) {
      const direction = sortBy.startsWith('-') ? 'DESC' : 'ASC'

      const sortParam = sortBy.replace('-', '')

      records.sort(sortRecords(direction, sortParam))
    }

    return {
      data: {
        limit,
        offset,
        results: records.slice(offset, offset + limit),
      },
      status: 200,
      statusText: 'OK',
      headers: {},
    }
  }

  return {
    getRecords,
    getTotals,
  }
}


function useApiClient({ recordCount = 100, latency = 'none' }) {
  const [client, setClient] = React.useState(null)

  React.useEffect(
    () => {
      const newClient = createApiClient({ recordCount, latency })
      setClient(newClient)
    },
    [latency, recordCount]
  )

  return client
}


export default createApiClient
