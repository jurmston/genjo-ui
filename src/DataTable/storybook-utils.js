import randomWords from 'random-words'


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


export function createDataTableTestData(count = 1000) {
  const names = randomWords(count)

  const result = []

  for (let i = 0; i < count; i += 1) {
    result.push({
      id: i + 1,
      name: names[i],
      discipline: TEST_DISCIPLINES[getRandomIntInclusive(0, 7)] ?? '',
      website: 'https://www.exmaple.com',
      phone_number: '+1 (775) 240-9128',
      primary_contact: null,
      amount: getRandomIntInclusive(10, 478) + getRandomIntInclusive(0, 99) / 100,
      count: getRandomIntInclusive(0, 10000),
      size: Math.random() * 100 - 50,
      modified: `2020-${getRandomIntInclusive(1,12)}-${getRandomIntInclusive(1,28)}`,
      is_active: Math.random() < 0.5 ? true : false,
    })
  }

  return result
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
    },
    {
      uuid: 'companies-default-2',
      field_name: 'phone_number',
      field_type: 'string',
      title: 'Phone Number',
      sort_type: 'alpha',
      width: 75,
    },
    {
      uuid: 'companies-default-3',
      field_name: 'primary_contact',
      field_type: 'related',
      sort_type: 'alpha',
      title: 'Primary Contact',
    },
    {
      uuid: 'companies-default-4',
      field_name: 'website',
      field_type: 'string',
      sort_type: 'alpha',
      title: 'Website',
    },
    {
      uuid: 'companies-default-5',
      field_name: 'is_active',
      field_type: 'bool',
      sort_type: 'generic',
      title: 'Active',
    },
    {
      uuid: 'companies-default-6',
      field_name: 'amount',
      field_type: 'currency',
      title: 'Amount',
      sort_type: 'number',
      total: 'sum',
    },
    {
      uuid: 'companies-default-7',
      field_name: 'count',
      field_type: 'number',
      title: 'Count',
      sort_type: 'number',
      total: 'average',
    },
    {
      uuid: 'companies-default-8',
      field_name: 'size',
      field_type: 'number',
      title: 'Size',
    },
    {
      uuid: 'companies-default-8',
      field_name: 'modified',
      field_type: 'datetime',
      title: 'Modified',
      sort_type: 'generic',
      total: 'latest',
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