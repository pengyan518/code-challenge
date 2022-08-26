/**
 * Debounce
 *
 * @param {Function} callback - The callback function
 * @param {Number} delay - The delay number value
 *
 * @returns {Function} - The callback function wrapped in `setTimeout` function
 */

function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout
  return function() {
    let context = this, args = arguments
    let later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export default debounce
