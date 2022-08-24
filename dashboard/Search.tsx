import {ReactNode, useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

type SearchProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const Search = (props: SearchProps) => {
  const [forecastday, setForecastday] = useState([])
  // const {value, setValue} = useMainContext()
  // const [current, setCurrent] = useState({})
  // const fetchInitial = async () => {
  //   try {
  //     const response = await axios.get(`${config.forecast}12771&days=5`)
  //     await setCurrent(response.data.current)
  //     await setForecastday(response.data.forecast.forecastday)
  //     await setValue({test:1})
  //   } catch (error) {
  //     throw error
  //   }
  // }
  //
  // useEffect(() => {
  //   if (forecastday.length === 0) fetchInitial()
  //   return () => {}
  // }, [fetchInitial, forecastday, forecastday.length, value])

  return (
    <div className={`max-w-screen-lg mx-auto px-3 ${props.yPadding ? props.yPadding : 'py-16'}`}>
      <input />
    </div>
  )
}

export {Search}
