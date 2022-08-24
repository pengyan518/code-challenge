export const domain = `https://api.weatherapi.com/v1/forecast.json`
export const apiKey: string = `8b6b868c3698444fb66162910222408`
export const prefix: string = `${domain}?key=${apiKey}`
export default Object.freeze({
  forecast: `${prefix}&q=`,
  xlmns: 'http://www.w3.org/2000/svg',
})
