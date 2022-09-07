export const domain = `https://api.weatherapi.com/`
export const apiKey: string = `c95e374f9bd04b9d8bc154335220709`
export const prefix: string = `${domain}v1/forecast.json?key=${apiKey}`
export const prefixSearch: string = `${domain}v1/search.json?key=${apiKey}`
export default Object.freeze({
  forecast: `${prefix}&q=`,
  search: `${prefixSearch}&q=`,
  xlmns: 'http://www.w3.org/2000/svg',
  ipFetcher: 'https://api.ipify.org/?format=json',
  // https://s.w-x.co/WeatherImages_Web/WeatherImage_Sunny-day_2.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70
  // https://s.w-x.co/WeatherImages_Web/WeatherImage_Cloudy-day_2.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70
  weatherImage: 'https://s.w-x.co/WeatherImages_Web/WeatherImage_',
  weatherImageParameter: '-day_2.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70',
})
