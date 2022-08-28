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
    <div className="w-full">
      <div className={`${styles.grid} mx-auto`}>{forecastday.length === 0 ? <></> : <CityDays forecastday={forecastday} />}</div>
    </div>
  )
}

export {Daily}

