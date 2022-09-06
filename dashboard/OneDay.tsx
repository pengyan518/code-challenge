import {ReactNode, useCallback, useEffect, useState} from 'react'
import Link from 'next/link'
import {useMainContext} from '../contexts/MainContext'

type DayProps = {
  oneDay?: any
  city?: string
}

const OneDay = (props: DayProps) => {
  const {date, date_epoch, day, hour} = props.oneDay
  const {maxtemp_f, mintemp_f, condition} = day

  const {setHoursDetail, setDetailPage, setLocation, forecastday, setFuture, setFutureInfo, twelveHoursPage, setTwelveHoursPage} =
    useMainContext()

  const showHours = useCallback(() => {
    setDetailPage(false)
    setFuture(true)
    setHoursDetail({
      city: props.city,
      hour,
      date,
    })
  }, [date, hour, props.city, setDetailPage, setFuture, setHoursDetail])

  const fetchDetails = useCallback(() => {
    const currentCity: {location: {}; current: {}} = forecastday.filter((city: {city: string}) => city.city === props.city)[0]
    setLocation(currentCity.location)
    setFutureInfo(props.oneDay)
    showHours()
    setTwelveHoursPage(true)
  }, [forecastday, props.city, props.oneDay, setFutureInfo, setLocation, setTwelveHoursPage, showHours])

  return (
    <Link href="/details" className="card text-center" onClick={fetchDetails}>
      <div>
        <div className="text-sm">{date}</div>
        {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={48} height={48} />}
        <p>
          {maxtemp_f}° {mintemp_f}°
        </p>
      </div>
    </Link>
  )
}

export {OneDay}
