export const domain = `https://api.weatherapi.com/`
export const apiKey: string = `8b6b868c3698444fb66162910222408`
export const prefix: string = `${domain}v1/forecast.json?key=${apiKey}`
export const prefixSearch: string = `${domain}v1/search.json?key=${apiKey}`
export default Object.freeze({
  forecast: `${prefix}&q=`,
  search: `${prefixSearch}&q=`,
  xlmns: 'http://www.w3.org/2000/svg',
})
