import {ReactNode, useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'

type DailyProps = {
  title?: string
  description?: string
  yPadding?: string
  children?: ReactNode
}

const Daily = (props: DailyProps) => {
  const {fetchInitial, forecastday, city, current} = useFetchCity()

  useEffect(() => {
    if (forecastday.length === 0) fetchInitial(city)
    return () => {}
  }, [fetchInitial, forecastday, city])
  console.debug(forecastday)
  return (
    <div className={`max-w-screen-lg mx-auto px-3`}>
      <div className={styles.grid}>
        {forecastday.length === 0 ? (
          <>Loading</>
        ) : (
          <>
            {forecastday.map((oneCity, i) => {
              return (
                <div key={i} className="grid-wrapper">
                  {oneCity.days.length > 0 && oneCity.days.map(oneDay => {
                    const {date, date_epoch, hour, day} = oneDay
                    const {maxtemp_f, mintemp_f, condition} = day
                    return (
                      <a key={date_epoch} className={styles.card}>
                        <h2>{date}</h2>
                        <p>{condition.text}</p>
                        <p>
                          {maxtemp_f} {mintemp_f}
                        </p>
                        {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={32} height={32} />}
                      </a>
                    )
                  })}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export {Daily}
