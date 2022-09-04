import {useCallback, useEffect} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from '../hooks/useFetchCity'
import useGeolocation from '../hooks/useGeolocation'
import {Hourly} from './Hourly'
import {Condition} from './Condition'
import {FutureCondition} from './FutureCondition'
import {CurrentCityDays} from './CurrentCityDays'
import ListUl from '../icons/ListUl'

const Current = () => {
  const {setDetailPage, current, location, forecastday, future} = useMainContext()
  const {coordinates, ip} = useGeolocation()
  const {fetchInitial, city} = useFetchCity()

  const handleBack = useCallback(() => {
    setDetailPage(false)
  }, [setDetailPage])

  useEffect(() => {
    if (forecastday.length === 0) {
      if (coordinates.lat !== Infinity && coordinates.long !== Infinity) {
        fetchInitial(`${coordinates.lat},${coordinates.long}`)
      } else if (ip) {
        fetchInitial(ip)
      }
    }
  }, [fetchInitial, forecastday, city, coordinates.lat, coordinates.long, ip, current, location])

  console.debug(forecastday)

  if (forecastday.length === 0) {
    return <div className="a-center">Loading...</div>
  }

  return (
    <div className="grid mx-auto w-full p-4 relative">
      <div className="current--wrapper mx-auto">
        {!future && Object.keys(current).length > 0 && Object.keys(location).length > 0 && (
          <Condition current={current} location={location} />
        )}
        {future && <FutureCondition location={location} />}
        {/*<Hourly />*/}
        <CurrentCityDays city={location.name} />
      </div>
    </div>
  )
}

export {Current}
