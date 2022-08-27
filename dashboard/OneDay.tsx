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

  const {hoursDetail, setHoursDetail} = useMainContext()

  const showHours = useCallback(() => {
    setHoursDetail({
      city: props.city,
      hour,
      date,
    })
  }, [date, hour, props.city, setHoursDetail])
  return (
    <a key={date_epoch} className={`${styles.card} text-center`} onClick={showHours}>
      <h5>{date}</h5>
      {/*<div>{condition.text}</div>*/}
      <p>
        {maxtemp_f}° {mintemp_f}°
      </p>
      {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={48} height={48} />}
    </a>
  )
}

export {OneDay}
