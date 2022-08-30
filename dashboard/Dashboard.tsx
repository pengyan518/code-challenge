import {ReactNode, useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import {CityDays} from './CityDays'
import {useMainContext} from '../contexts/MainContext'

const Dashboard = () => {
  const {forecastday} = useMainContext()

  return (
    <div className="w-full">
      <div className={`${styles.grid} mx-auto`}>{forecastday.length === 0 ? <></> : <CityDays forecastday={forecastday} />}</div>
    </div>
  )
}

export {Dashboard}
