import {ReactNode, useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

type DailyProps = {
  // title?: string
  // description?: string
  // yPadding?: string
  // children?: ReactNode
}

const useFetchCity = () => {
  const [forecastday, setForecastday] = useState([])
  const {city, setCurrentCity} = useMainContext()
  const [current, setCurrent] = useState({})

  const fetchInitial = useCallback(async () => {
    try {
      const response = await axios.get(`${config.forecast}${city}&days=5`)
      await setCurrent(response.data.current)
      await setForecastday(response.data.forecast.forecastday)
      // await setValue({test:1})
    } catch (error) {
      throw error
    }
  },[city])

  useEffect(() => {
    if (forecastday.length === 0) fetchInitial()
    return () => {}
  }, [fetchInitial, forecastday, forecastday.length, city])

  return {fetchInitial, forecastday, city, current, setCurrentCity}
}

export {useFetchCity}
