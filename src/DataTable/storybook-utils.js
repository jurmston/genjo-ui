import randomWords from 'random-words'
import { DateTime } from 'luxon'


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const TEST_DISCIPLINES = [
  'Engineering',
  'Local Government',
  'Homeowner',
  'Architect',
  'Developer',
  'Interiors',
]



export const testDataColumnSet = [
  {
    field: 'checkbox',
    width: 36,
  },
  {
    field: 'name',
    label: 'Name',
    type: 'text',
    unit: '',
    total: '',
    width: 200,
  },

  {
    field: 'amount',
    label: 'Amount',
    type: 'currency',
    total: 'sum',
    width: 100,
  },

  {
    field: 'distance',
    label: 'Distance',
    type: 'number',
    unit: 'ft',
    total: '',
    width: 300,
  },

  {
    field: 'start_date',
    label: 'Date',
    type: 'date',
    total: 'earliest',
    format: 'DATE_FULL',
    width: 200,
  },

  {
    field: 'end_date',
    label: 'Date',
    type: 'date',
    total: 'earliest',
    format: '',
    width: 200,
  },

]

const BASE_TIMESTAMP = DateTime.fromISO('2018-02-01')
const DIFF_MILLIS = -BASE_TIMESTAMP.diffNow('milliseconds')


export function createDataTableTestData(count = 1000) {
  const names = randomWords(count)

  const records = []

  const metaData = {
    count,
    totals: {
      amount: { value: 0, label: 'Total', type: 'currency' },
      count: { value: 0, label: 'Total', type: 'number' },
      size: { value: 0, label: 'Average', type: 'number' },
      modified: { value: null, label: 'Lastest', type: 'datetime' },
      is_active: { value: 0, label: 'Active Count', type: 'number' },
    }
  }

  for (let i = 0; i < count; i += 1) {
    const newModified = BASE_TIMESTAMP.plus({
      milliseconds: Math.random() * DIFF_MILLIS,
    })

    const record = {
      id: i + 1,
      name: names[i],
      discipline: TEST_DISCIPLINES[getRandomIntInclusive(0, 7)] ?? '',
      website: 'https://www.exmaple.com',
      phone_number: '+1 (775) 240-9128',
      primary_contact: null,
      amount: getRandomIntInclusive(10, 478) + getRandomIntInclusive(0, 99) / 100,
      count: getRandomIntInclusive(0, 10000),
      size: Math.random() * 100 - 50,
      modified: newModified.toISO(),
      is_active: Math.random() < 0.5 ? true : false,
    }

    records.push(record)

    metaData.totals.amount.value += record.amount
    metaData.totals.count.value += record.count
    // Running average formula:
    // https://math.stackexchange.com/questions/106700/incremental-averageing
    metaData.totals.size.value += (record.size - metaData.totals.size.value) / (i + 1)
    metaData.totals.is_active.value += +record.is_active

    metaData.totals.modified.value = i === 0
      ? newModified.toISO()
      : newModified > DateTime.fromISO(metaData.totals.modified.value)
      ? newModified.toISO()
      : metaData.totals.modified.value

  }

  // Create discipline subtotal data
  const orderedRecords = records.map(record => ({ ...record }))
  orderedRecords.sort((a, b) => {
    if (a.discipline > b.discipline) {
      return 1
    }

    if (a.discipline < b.discipline) {
      return -1
    }

    return 0
  })

  let disciplines = {}
  let subtotalIndex = 0
  for (let i = 0; i < orderedRecords.length; i += 1) {
    const record = orderedRecords[i]
    const key = record.discipline

    if (!disciplines[key]) {
      disciplines[key] = {
        index: subtotalIndex,
        first: i,
        last: i,
        title: key || 'Uncategorized',
        subtotals: {
          is_active: 0,
          amount: 0,
          count: 0,
          size: 0,
          modified: record.modified,
        }
      }

      subtotalIndex += 1
    }

    disciplines[key].last = i

    disciplines[key].subtotals.amount += record.amount
    disciplines[key].subtotals.count += record.count
    // Running average formula:
    // https://math.stackexchange.com/questions/106700/incremental-averageing
    disciplines[key].subtotals.size += (record.size - disciplines[key].subtotals.size) / (i + 1)
    disciplines[key].subtotals.is_active += +record.is_active

    const newModified = DateTime.fromISO(record.modified)
    disciplines[key].subtotals.modified = i === 0
      ? newModified.toISO()
      : newModified > DateTime.fromISO(disciplines[key].subtotals.modified)
      ? newModified.toISO()
      : disciplines[key].subtotals.modified
  }

  return {
    records,
    metaData,
    subtotals: {
      discipline: disciplines,
    }
  }
}


export const companiesDefaultColumnSet = {
  name: 'Default View',
  fixed_columns: 1,
  columns: [
    {
      uuid: 'companies-default-0',
      field_name: 'name',
      field_type: 'string',
      title: 'Name',
      sort_type: 'alpha',
      width: 200,
    },
    {
      uuid: 'companies-default-1',
      field_name: 'discipline',
      field_type: 'string',
      title: 'Discipline',
      sort_type: 'alpha',
      width: 150,
      subtotal: true,
    },
    // {
    //   uuid: 'companies-default-2',
    //   field_name: 'phone_number',
    //   field_type: 'string',
    //   title: 'Phone Number',
    //   sort_type: 'alpha',
    //   width: 75,
    // },
    // {
    //   uuid: 'companies-default-3',
    //   field_name: 'primary_contact',
    //   field_type: 'related',
    //   sort_type: 'alpha',
    //   title: 'Primary Contact',
    // },
    // {
    //   uuid: 'companies-default-4',
    //   field_name: 'website',
    //   field_type: 'string',
    //   sort_type: 'alpha',
    //   title: 'Website',
    // },
    {
      uuid: 'companies-default-5',
      field_name: 'is_active',
      field_type: 'bool',
      sort_type: 'generic',
      title: 'Active',
      align: 'center',
    },
    {
      uuid: 'companies-default-6',
      field_name: 'amount',
      field_type: 'currency',
      title: 'Amount',
      sort_type: 'number',
      total: 'sum',
      align: 'right',
    },
    {
      uuid: 'companies-default-7',
      field_name: 'count',
      field_type: 'number',
      title: 'Count',
      sort_type: 'number',
      total: 'average',
      align: 'right',
    },
    {
      uuid: 'companies-default-8',
      field_name: 'size',
      field_type: 'number',
      title: 'Size',
      align: 'right',
    },
    {
      uuid: 'companies-default-8',
      field_name: 'modified',
      field_type: 'datetime',
      title: 'Modified',
      sort_type: 'generic',
      total: 'latest',
      align: 'right',
    },
  ]
}


export const companyColumnSetSchema = {
  created: {
    value: 'created',
    title: 'Created On',
    type: 'datetime',
  },

  modified: {
    value: 'modified',
    title: 'Modified On',
    type: 'datetime',
  },

  is_active: {
    value: 'is_active',
    title: 'Active',
    type: 'bool',
  },

  name: {
    value: 'name',
    title: 'Name',
    type: 'text',
    required: true,
  },

  discipline: {
    value: 'discipline',
    title: 'Discipline',
    type: 'text',
  },

  tags: {
    value: 'tags',
    title: 'Tags',
    type: 'tags',
  },

  primary_contact: {
    value: 'primary_contact',
    title: 'Primary Contact',
    type: 'related',
  },

  billing_contact: {
    value: 'billing_contact',
    title: 'Billing Contact',
    type: 'related',
  },

  website: {
    value: 'website',
    title: 'Website',
    type: 'text',
  },

  phone_number: {
    value: 'phone_number',
    title: 'Phone Number',
    type: 'text',
  },

  address: {
    value: 'address',
    title: 'Address',
    type: 'text',
  },

  country: {
    value: 'country',
    title: 'Country',
    type: 'text',
  },

  state: {
    value: 'state',
    title: 'State',
    type: 'text',
  },

  county: {
    value: 'county',
    title: 'County',
    type: 'text',
  },

  city: {
    value: 'city',
    title: 'City',
    type: 'text',
  },

  postal_code: {
    value: 'postal_code',
    title: 'Postal Code',
    type: 'text',
  },

  amount: {
    value: 'amount',
    title: 'Amount',
    type: 'currency',
  },

  count: {
    value: 'count',
    title: 'Count',
    type: 'number',
  },

}