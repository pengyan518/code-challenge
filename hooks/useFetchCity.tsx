import {ReactNode, useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'


const useFetchCity = () => {
  const {city, setCurrentCity, forecastday, setForecastday} = useMainContext()
  const [current, setCurrent] = useState({})

  const fetchInitial = useCallback(async (cityName:string) => {
    try {
      const response = await axios.get(`${config.forecast}${cityName}&days=5`)
      await setCurrent(response.data.current)
      await setForecastday(response.data.forecast.forecastday)
      // await setValue({test:1})
    } catch (error) {
      throw error
    }
  },[setForecastday])



  return {fetchInitial, forecastday, city, current, setCurrentCity}
}

export {useFetchCity}
