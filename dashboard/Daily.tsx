import {ReactNode, useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import {useFetchCity} from '../hooks/useFetchCity'
import {CityDays} from './CityDays'

const Daily = () => {
  const {fetchInitial, forecastday, city, current} = useFetchCity()

  useEffect(() => {
    if (forecastday.length === 0) fetchInitial(city)
    return () => {}
  }, [fetchInitial, forecastday, city])
  console.debug(forecastday)
  return (
    <div className={`max-w-screen-lg mx-auto px-3`}>
      <div className={styles.grid}>{forecastday.length === 0 ? <>Loading</> : <CityDays forecastday={forecastday} city={city} />}</div>
    </div>
  )
}

export {Daily}

