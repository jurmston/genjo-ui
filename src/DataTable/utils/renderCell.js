import * as React from 'react'
import { DateTime } from 'luxon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { colors } from '../../ThemeProvider'
import NumberFormat from 'react-number-format'


export function renderCell(type, value) {
  switch (type) {
    case 'currency': {
      return (
        <NumberFormat
          prefix="$"
          displayType="text"
          value={value}
          thousandSeparator=","
          fixedDecimalScale
          decimalScale={2}
        />
      )
    }

    case 'number': {
      return (
        <NumberFormat
          displayType="text"
          value={value}
          thousandSeparator=","
          decimalScale={2}
        />
      )
    }

    case 'datetime': {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
    }

    case 'date': {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)
    }

    case 'bool': {
      return value ? (
        <CheckCircleIcon style={{ color: colors.green[500] }} />
      ) : (
        <CancelIcon style={{ color: colors.red[500] }} />
      )
    }

    case 'string': {
      return value?.toString() ?? ''
    }

    default: {
      return ''
    }
  }
}

export default renderCell
