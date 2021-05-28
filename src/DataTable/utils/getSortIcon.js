import SortAlphaIcon from '../../icons/SortAlphaIcon'
import SortAlphaAscendingIcon from '../../icons/SortAlphaAscendingIcon'
import SortAlphaDescendingIcon from '../../icons/SortAlphaDescendingIcon'
import SortNumberIcon from '../../icons/SortNumberIcon'
import SortNumberAscendingIcon from '../../icons/SortNumberAscendingIcon'
import SortNumberDescendingIcon from '../../icons/SortNumberDescendingIcon'
import SortGenericIcon from '../../icons/SortGenericIcon'
import SortGenericAscendingIcon from '../../icons/SortGenericAscendingIcon'
import SortGenericDescendingIcon from '../../icons/SortGenericDescendingIcon'


/** Get the icon component given sort type and direction. */
export function getSortIcon({ sortBy, column }) {
  const { type, dataKey } = column

  if (!type) {
    return null
  }

  const normalizedSortBy = sortBy[0] === '-' ? sortBy.slice(1) : sortBy

  const direction = normalizedSortBy !== dataKey
  ? ''
  : sortBy[0] === '-'
  ? 'DESC'
  : 'ASC'

  if (type === 'string') {
    return direction === 'ASC'
      ? SortAlphaAscendingIcon
      : direction === 'DESC'
      ? SortAlphaDescendingIcon
      : SortAlphaIcon
  }

  if (type === 'number') {
    return direction === 'ASC'
      ? SortNumberAscendingIcon
      : direction === 'DESC'
      ? SortNumberDescendingIcon
      : SortNumberIcon
  }

  return direction === 'ASC'
    ? SortGenericAscendingIcon
    : direction === 'DESC'
    ? SortGenericDescendingIcon
    : SortGenericIcon
}

export default getSortIcon
