export function getCellAlignment(field_type) {
  switch (field_type) {
    case 'number':
    case 'datetime':
    case 'date':
    case 'currency': {
      return 'right'
    }

    case 'checkbox':
    case 'bool': {
      return 'center'
    }

    default: {
      return 'left'
    }
  }
}

export default getCellAlignment
