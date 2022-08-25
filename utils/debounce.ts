/**
 * Debounce
 *
 * @param {Function} callback - The callback function
 * @param {Number} delay - The delay number value
 *
 * @returns {Function} - The callback function wrapped in `setTimeout` function
 */

export default (func: any, timeout = 300) => {
  let timer: string | number | NodeJS.Timeout | undefined
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
