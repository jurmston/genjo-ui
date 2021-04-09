/**
 * Extract file extension from filename.
 *
 * @param {string} filename
 * @return {string} Extension of input filename
 */
function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  return filename.slice().split('.').pop().toLowerCase()
}

const BYTES = {
  K: 1024,
  M: 1024 * 1024,
  G: 1024 * 1024 * 1024,
}

/**
 * Convert string representing file size to bytes.
 *
 * @param {string} sizeString - String with format "integer[' ' + (K, M, or G)]"
 * @return {float} Number of bytes represented by sizeString
 */
function sizeToBytes(sizeString) {
  const [value, unit] = (sizeString || '0').toUpperCase().split(' ')

  if (unit && !BYTES[unit]) {
    throw new Error('Invalid suffix. Must be K, M, or G.')
  }

  if (value && !/^\d+$/.test(value)) {
    throw new Error('Value portion of string must be digits only.')
  }

  return parseFloat(value) * (unit ? BYTES[unit] : 1)
}

/**
 * Convert integer number of bytes to readible string.
 */
function bytesToSize(bytes) {
  const unit = bytes / BYTES.G > 1 ? 'G' : bytes / BYTES.M > 1 ? 'M' : 'K'

  return `${Math.round(bytes / BYTES[unit])} ${unit}`
}

export { getFileExtension, sizeToBytes, bytesToSize }
