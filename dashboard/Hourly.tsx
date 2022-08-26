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
    <div className="grid mx-auto w-full">
      {hoursDetail.city} {hoursDetail.date}
      <div className="hours-grid grid">
        {hoursDetail.hour.length > 0 && hoursDetail.hour.filter((hour, index)=>index < 12).map(oneHour => {
          const {condition, temp_f, time_epoch, time} = oneHour
          return (
            <div key={time_epoch}>
              <div>{time.split(' ')[1]}</div>
              <div>{temp_f}°</div>
              <img src={`https://${condition.icon}`} alt="" width={24} height={24} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export {Hourly}
