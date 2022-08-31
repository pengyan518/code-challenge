import {ReactNode, useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

const useFetchCity = () => {
  const {city, setCurrentCity, forecastday, setForecastday, setHoursDetail, current, setCurrent, location, setLocation} = useMainContext()

  const showHours = useCallback(
    (name: string, hour: any[], date: string) => {
      setHoursDetail({
        city: name,
        hour,
        date,
      })
    },
    [setHoursDetail]
  )

  const filterEmpty = useCallback((forecastday: any, currentName: string, newItem: any[], current: any, location: any) => {
    // @ts-ignore
    return [...forecastday.filter((item: {city: string; days: any[]}) => item !== {city: '', days: []}), {city: currentName, days: newItem, current, location}]
  }, [])

  const fetchInitial = useCallback(
    async (query: string) => {
      try {
        if (query) {
          const response = await axios.get(`${config.forecast}${query}&days=5`)
          const {location, current, forecast} = response.data
          setCurrent(current)
          setLocation(location)
          setCurrentCity(location.name)
          const forecastDaysArray = forecast.forecastday
          setForecastday(filterEmpty(forecastday, location.name, forecastDaysArray, current, location))
          showHours(location.name, forecastDaysArray[0].hour, forecastDaysArray[0].date)
        }
      } catch (error) {
        throw error
      }
    },
    [filterEmpty, forecastday, setCurrent, setCurrentCity, setForecastday, setLocation, showHours]
  )


  return {fetchInitial, forecastday, city, setCurrentCity}
}

export {useFetchCity}
