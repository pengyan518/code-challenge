import {useCallback, useEffect} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'
import useGeolocation from '../hooks/useGeolocation'
import {Hourly} from './Hourly'
import {Condition} from './Condition'
import {FutureCondition} from './FutureCondition'

const Current = () => {
  const {setDetailPage, current, location, forecastday, future} = useMainContext()
  const {coordinates, ip} = useGeolocation()
  const {fetchInitial, city} = useFetchCity()

  const handleBack = useCallback(() => {
    setDetailPage(false)
  }, [setDetailPage])

  useEffect(() => {
    if (forecastday.length === 0) {
      // @ts-ignore
      if (coordinates.lat !== Infinity && coordinates.long !== Infinity) {
        // @ts-ignore
        fetchInitial(`${coordinates.lat},${coordinates.long}`)
      } else if (ip) {
        fetchInitial(ip)
      }
    }
    console.debug('current', current)
    console.debug('location', location)
    // @ts-ignore
  }, [fetchInitial, forecastday, city, coordinates.lat, coordinates.long, ip, current, location])

  return (
    <div className="grid mx-auto w-full">
      <div className="cursor-pointer" onClick={handleBack}>
        Go to Cities
      </div>
      {!future && Object.keys(current).length > 0 && Object.keys(location).length > 0 && (
        <Condition current={current} location={location} />
      )}
      {future && <FutureCondition location={location} />}
      <Hourly />
    </div>
  )
}

export {Current}
