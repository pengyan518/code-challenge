import {ReactNode, useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

const useFetchCity = () => {
  const {city, setCurrentCity, forecastday, setForecastday} = useMainContext()
  const [current, setCurrent] = useState({})

  const filterDuplicate = useCallback((forecastday: any[], currentName: string, newItem: any[]) => {
    const feeds = forecastday.map(item => item.city)
    if (feeds.includes(currentName)) {
      return forecastday.filter(item => item !== {city: '', days: []})
    }
    return [...forecastday.filter(item => item !== {city: '', days: []}), {city: currentName, days: newItem}]
  }, [])

  const fetchInitial = useCallback(
    async (cityName: string) => {
      try {
        const response = await axios.get(`${config.forecast}${cityName}&days=5`)
        const {location, current, forecast} = response.data
        await setCurrent(current)
        await setCurrentCity(location.name)
        const forecastDaysArray = forecast.forecastday
        await setForecastday(filterDuplicate(forecastday, location.name, forecastDaysArray))
      } catch (error) {
        throw error
      }
    },
    [filterDuplicate, forecastday, setCurrentCity, setForecastday]
  )

  return {fetchInitial, forecastday, city, current, setCurrentCity}
}

export {useFetchCity}
