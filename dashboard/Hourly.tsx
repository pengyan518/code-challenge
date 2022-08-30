import {ReactNode, useCallback, useEffect, useState} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'


const Hourly = () => {
  const {hoursDetail, setDetailPage} = useMainContext()
  const handleBack = useCallback(() => {
    setDetailPage(false)
  }, [setDetailPage])
  return (
    <div className="grid mx-auto w-full">
      <div className="cursor-pointer" onClick={handleBack}>Back to Cities</div>
      {hoursDetail.city} {hoursDetail.date}
      <div className="hours-grid grid">
        {hoursDetail.hour.length > 0 &&
          hoursDetail.hour
            .filter((hour, index) => index < 12)
            .map(oneHour => {
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
