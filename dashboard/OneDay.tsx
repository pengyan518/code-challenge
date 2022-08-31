import {ReactNode, useCallback, useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import {useMainContext} from '../contexts/MainContext'

type DayProps = {
  oneDay?: any
  city?: string
}

const OneDay = (props: DayProps) => {
  const {date, date_epoch, day, hour} = props.oneDay
  const {maxtemp_f, mintemp_f, condition} = day

  const {hoursDetail, setHoursDetail, detailPage, setDetailPage, setCurrent, location, setLocation, forecastday, setCurrentCity, setFuture, setFutureInfo} = useMainContext()

  const showHours = useCallback(() => {
    setDetailPage(true)
    setFuture(true)
    setHoursDetail({
      city: props.city,
      hour,
      date,
    })
  }, [date, hour, props.city, setDetailPage, setHoursDetail])

  const fetchDetails = useCallback(() => {
    const currentCity:{location:{}, current:{}} = forecastday.filter((city: {city: string}) => city.city === props.city)[0]
    setLocation(currentCity.location)
    setFutureInfo(props.oneDay)
    showHours()
  }, [forecastday, props.city, props.oneDay, setFutureInfo, setLocation, showHours])

  return (
    <a key={date_epoch} className={`${styles.card} text-center`} onClick={fetchDetails}>
      <div className="text-sm">{date}</div>
      {/*<div>{condition.text}</div>*/}
      {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={48} height={48} />}
      <p>
        {maxtemp_f}° {mintemp_f}°
      </p>
    </a>
  )
}

export {OneDay}
