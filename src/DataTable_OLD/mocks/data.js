import randomWords from 'random-words'
import { DateTime } from 'luxon'
import getRandomUser from '../../../.storybook/utils/getRandomUser'


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const BASE_TIMESTAMP = DateTime.fromISO('2018-02-01')
const DIFF_MILLIS = -BASE_TIMESTAMP.diffNow('milliseconds')
const TEST_DISCIPLINES = ['Engineering', 'Local Government', 'Homeowner', 'Architect', 'Developer', 'Interiors']


export function createDataSet(recordCount = 1000, contactsCount = 100) {
  console.log('Creating data set...')
  const names = randomWords(recordCount)
  const contacts = getRandomUser(contactsCount)

  const records = []

  for (let i = 0; i < recordCount; i += 1) {
    const newModified = BASE_TIMESTAMP.plus({
      milliseconds: Math.random() * DIFF_MILLIS,
    })

    const record = {
      id: `Company:${i + 1}`,
      name: names[i],
      discipline: TEST_DISCIPLINES[getRandomIntInclusive(0, 7)] ?? '',
      website: 'https://www.exmaple.com',
      phone_number: '+1 (775) 240-9128',
      primary_contact: contacts?.[getRandomIntInclusive(0, contactsCount - 1)] ?? null,
      amount: getRandomIntInclusive(10, 234987) + getRandomIntInclusive(0, 99) / 100,
      count: getRandomIntInclusive(0, 10000),
      size: Math.random() * 100 - 50,
      modified: newModified.toISO(),
      is_active: Math.random() < 0.5 ? true : false,
    }

    records.push(record)
  }

  return records
}

export function calculateTotals(records = []) {
  const totals = {
    amount: { value: 0, label: 'Total', type: 'currency' },
    count: { value: 0, label: 'Total', type: 'number' },
    size: { value: 0, label: 'Average', type: 'number' },
    modified: { value: null, label: 'Latest', type: 'datetime' },
    is_active: { value: 0, label: 'Active Count', type: 'number' },
  }

  records.forEach((record, index) => {
    totals.amount.value += record.amount
      totals.count.value += record.count
      // Running average formula:
      // https://math.stackexchange.com/questions/106700/incremental-averageing
      totals.size.value += (record.size - totals.size.value) / (index + 1)
      totals.is_active.value += +record.is_active

      const newModified = DateTime.fromISO(record.modified)
      totals.modified.value =
        index === 0
          ? newModified.toISO()
          : newModified > DateTime.fromISO(totals.modified.value)
          ? newModified.toISO()
          : totals.modified.value
  })

  return totals
}


export function calculateDisciplineSubtotals(records = []) {
  // Create discipline subtotal data
  // const orderedRecords = records.map(record => ({ ...record }))
  // orderedRecords.sort((a, b) => {
  //   if (a.discipline > b.discipline) {
  //     return 1
  //   }

  //   if (a.discipline < b.discipline) {
  //     return -1
  //   }

  //   return 0
  // })

  let subtotalIndex = 0

  const subtotals = {}

  records.forEach((record, index) => {
    const key = record.discipline

    if (!subtotals[key]) {
      subtotals[key] = {
        index: subtotalIndex,
        first: index,
        last: index,
        title: key || 'Uncategorized',
        subtotals: {
          is_active: 0,
          amount: 0,
          count: 0,
          size: 0,
          modified: record.modified,
        },
      }

      subtotalIndex += 1
    }

    subtotals[key].last = index

    subtotals[key].subtotals.amount += record.amount
    subtotals[key].subtotals.count += record.count
    // Running average formula:
    // https://math.stackexchange.com/questions/106700/incremental-averageing
    subtotals[key].subtotals.size += (record.size - subtotals[key].subtotals.size) / (i + 1)
    subtotals[key].subtotals.is_active += +record.is_active

    const newModified = DateTime.fromISO(record.modified)
    subtotals[key].subtotals.modified =
      index === 0
        ? newModified.toISO()
        : newModified > DateTime.fromISO(subtotals[key].subtotals.modified)
        ? newModified.toISO()
        : subtotals[key].subtotals.modified
  })

  return subtotals
}