import {ReactNode, useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

type DailyProps = {
  title?: string
  description?: string
  yPadding?: string
  children?: ReactNode
}

const Daily = (props: DailyProps) => {
  const [forecastday, setForecastday] = useState([])
  const {value, setValue} = useMainContext()
  const [current, setCurrent] = useState({})
  const fetchInitial = async () => {
    try {
      const response = await axios.get(`${config.forecast}12771&days=5`)
      await setCurrent(response.data.current)
      await setForecastday(response.data.forecast.forecastday)
      await setValue({test:1})
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (forecastday.length === 0) fetchInitial()
    return () => {}
  }, [fetchInitial, forecastday, forecastday.length, value])

  return (
    <div className={`max-w-screen-lg mx-auto px-3 ${props.yPadding ? props.yPadding : 'py-16'}`}>
      <div className={styles.grid}>
        {forecastday.length === 0  ? (
          <>Loading</>
        ) : (
          <>
            {forecastday.map(oneDay => {
              const {date, date_epoch, hour, day} = oneDay
              const {avgtemp_f, condition} = day
              console.debug(value)
              return (
                <a key={date_epoch} className={styles.card}>
                  <h2>{date}</h2>
                  <p>{condition.text}</p>
                  <p>{avgtemp_f}</p>
                  {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={32} height={32} />}
                </a>
              )
            })}
          </>
        )}
      </div>

      {props.children}
    </div>
  )
}

export {Daily}
