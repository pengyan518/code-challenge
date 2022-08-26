import {ReactNode, useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'

type HourlyProps = {
  children?: ReactNode
}

const Hourly = (props: HourlyProps) => {
  const {hoursDetail, setHoursDetail} = useMainContext()
  // if (hoursDetail.hour.length === 0) return <></>
  return (
    <div className={`max-w-screen-lg mx-auto px-3`}>
      {hoursDetail.city}
      <div>
        {hoursDetail.hour.length > 0 && hoursDetail.hour.map(oneHour => {
          const {condition, temp_f, time_epoch} = oneHour
          return (
            <div key={time_epoch}>
              <img src={`https://${condition.icon}`} alt="" width={24} height={24} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export {Hourly}
