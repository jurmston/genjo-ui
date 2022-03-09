export const CURRENCY_DECIMAL_EXCEPTIONS = {
  BHD: 3,
  CVE: 0,
  DJF: 0,
  GNF: 0,
  IQD: 3,
  JOD: 3,
  JPY: 0,
  KMF: 0,
  KRW: 0,
  KWD: 3,
  LYD: 3,
  OMR: 3,
  PYG: 0,
  RWF: 0,
  TND: 3,
  UGX: 0,
  VND: 0,
  VUV: 0,
  XAF: 0,
  XOF: 0,
  XPF: 0,
}


export function getCurrencyDecimalPlaces(currency) {
  return CURRENCY_DECIMAL_EXCEPTIONS[currency] ?? 2
}


export function getCurrencySymbol(locale, currency) {
  try {
    return (0)
      .toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, '')
      .trim()
  } catch {
    return '¤'
  }
}


/**
 * Factory that creates a function to convert zero-decimal currency value to
 * its locale-apportiate format.
 *
 * All currency values in the backend are stored as integers in the smallest
 * possible unit of the target currency. Most currencies' lowest unit value is
 * 1/100th of the main currency unit. For example in USD the cent. However,
 * some countries like Japan, are already zero-decimal (e.g. 1 Yen is the
 * lowest value). Others, like Kuwait (KWD), use three decimals: KWD 6.500.
 *
 * @param {*} options
 * @param {string} options.locale The IANA Language Subtag for the
 *   language/locale being user. If a lanuage isn't provided, the default from
 *   `window.navigator` will used if avaialble. Otherwise the default is
 *   `us-EN`.
 * @param {string} options.currency The ISO 4217 currency code for the desired
 *   currency. The default is `USD`.
 * @param {bool} options.hideSymbol If `true` the currency symbol will be hidden.
 * @param {bool} options.shouldOverrideDecimalPlaces If `true` the decimal
 *   places will be set manually.
 * @param {number} options.decimalPlacesOverride The overridden value.
 * @returns A function to convert zero-decimal intergers into a locale
 * formatted currency string.
 */
export function formatCurrency(value, options) {
  const locale = (options?.locale
    || window?.navigator?.locale
    || 'en-US'
  ).toLowerCase()

  const currency = (options?.currency || 'USD').toUpperCase()

  const decimalPlaces = options.shouldOverrideDecimalPlaces
    ? (options?.decimalPlacesOverride ?? 2)
    : getCurrencyDecimalPlaces(currency)
  const factor = 10 ** decimalPlaces

  try {
    return (options?.hideSymbol
      ? new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })
      : options.shouldOverrideDecimalPlaces
      ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })
      : new Intl.NumberFormat(locale, { style: 'currency', currency })
    ).format(value / factor)
  } catch (err) {
    return value * factor
  }
}
