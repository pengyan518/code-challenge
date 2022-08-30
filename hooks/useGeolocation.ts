import {useCallback, useEffect, useState} from 'react'

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000,
}

const useGeolocation = () => {
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const getCoords: () => Promise<unknown> = () => {
    return new Promise((resolve, reject) => {
      const error = (err: {code: string; message: string}) => {
        console.warn(`ERROR(${err.code}): ${err.message}`)
        reject(`reject Reason: ${err.message}`)
      }

      if ('geolocation' in navigator) {
        const success = (pos: {coords: any}) => {
          const crd = pos.coords
          // console.debug(crd.latitude, crd.longitude)
          // setLat(crd.latitude)
          // setLong(crd.longitude)
          const city = {
            lt: crd.latitude,
            lg: crd.longitude,
          }
          navigator.geolocation.clearWatch(id)
          resolve(city)
        }
        const id = navigator.geolocation.watchPosition(success, error, options)
      } else {
        reject(`No geolocation`)
      }
    })
  }

  const saveCoords = useCallback(async () => {
    const {lt, lg} = await getCoords()
    setLat(lt)
    setLong(lg)
  }, [])

  useEffect(() => {
    if (lat === 0 && long === 0) saveCoords
  }, [lat, long, saveCoords])

  return [lat, long]
}

export default useGeolocation
