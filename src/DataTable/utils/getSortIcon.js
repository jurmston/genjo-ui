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
export function getSortIcon({ isSelected = false, type = '', direction = 'ASC' }) {
  if (!type) {
    return null
  }

  if (type === 'string') {
    return !isSelected
      ? SortAlphaIcon
      : direction === 'ASC'
      ? SortAlphaAscendingIcon
      : SortAlphaDescendingIcon
  }

  if (type === 'number') {
    return !isSelected
      ? SortNumberIcon
      : direction === 'ASC'
      ? SortNumberAscendingIcon
      : SortNumberDescendingIcon
  }

  return !isSelected
    ? SortGenericIcon
    : direction === 'ASC'
    ? SortGenericAscendingIcon
    : SortGenericDescendingIcon
}

export default getSortIcon
