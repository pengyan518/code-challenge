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

  const {hoursDetail, setHoursDetail, detailPage, setDetailPage} = useMainContext()

  const showHours = useCallback(() => {
    setDetailPage(true)
    setHoursDetail({
      city: props.city,
      hour,
      date,
    })
  }, [date, hour, props.city, setDetailPage, setHoursDetail])

  return (
    <a key={date_epoch} className={`${styles.card} text-center`} onClick={showHours}>
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
