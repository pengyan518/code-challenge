import {useCallback, useEffect} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'
import useGeolocation from '../hooks/useGeolocation'

const Hourly = () => {
  const {hoursDetail, setDetailPage} = useMainContext()
  const {coordinates, ip} = useGeolocation()
  const {fetchInitial, forecastday, city} = useFetchCity()
  const handleBack = useCallback(() => {
    setDetailPage(false)
  }, [setDetailPage])

  useEffect(() => {
    if (forecastday.length === 0) {
      if (coordinates.lat !== Infinity && coordinates.long !== Infinity) {
        fetchInitial(`${coordinates.lat},${coordinates.long}`)
      } else if(ip) {
        fetchInitial(ip)
      }
    }

    return () => {}
  }, [fetchInitial, forecastday, city, coordinates.lat, coordinates.long, ip])

  return (
    <div className="grid mx-auto w-full">
      <div className="cursor-pointer" onClick={handleBack}>
        Go to Cities
      </div>
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
                  <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
                </div>
              )
            })}
      </div>
    </div>
  )
}

export {Hourly}
