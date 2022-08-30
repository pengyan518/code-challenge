import {ReactNode, useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

const useFetchCity = () => {
  const {city, setCurrentCity, forecastday, setForecastday, setHoursDetail, setDetailPage} = useMainContext()
  const [current, setCurrent] = useState({})

  const showHours = useCallback(
    (name: string, hour: any[], date: string) => {
      // setDetailPage(true)
      setHoursDetail({
        city: name,
        hour,
        date,
      })
    },
    [setHoursDetail]
  )

  const filterEmpty = useCallback((forecastday: any, currentName: string, newItem: any[]) => {
    return [...forecastday.filter((item: {city: string; days: any[]}) => item !== {city: '', days: []}), {city: currentName, days: newItem}]
  }, [])

  const fetchInitial = useCallback(
    async (query: string) => {
      try {
        if (query) {
          const response = await axios.get(`${config.forecast}${query}&days=5`)
          const {location, current, forecast} = response.data
          await setCurrent(current)
          await setCurrentCity(location.name)
          const forecastDaysArray = forecast.forecastday
          setForecastday(filterEmpty(forecastday, location.name, forecastDaysArray))
          showHours(location.name, forecastDaysArray[0].hour, forecastDaysArray[0].date)
        }
      } catch (error) {
        throw error
      }
    },
    [filterEmpty, forecastday, setCurrentCity, setForecastday, showHours]
  )

  return {fetchInitial, forecastday, city, current, setCurrentCity}
}

export {useFetchCity}
