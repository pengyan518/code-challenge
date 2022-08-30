import {useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import {useMainContext} from '../contexts/MainContext'
import config from '../config'

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000,
}

const fetchIp = async () => {
  try {
    const response = await axios.get(config.ipFetcher)
    const result = response.data
    return result.ip
  } catch (error) {
    throw new Error(`IpFetcher unable to fetch: ${error.message}`)
  }
}
const useGeolocation = () => {
  const {coordinatesDone, setCoordinatesDone, coordinates, setCoordinates, ip, setIp} = useMainContext()

  const getCoords: () => Promise<unknown> = () => {
    return new Promise((resolve, reject) => {
      const error = async (err: {code: string; message: string}) => {
        console.debug(`reject Reason: ${err.message}`)
        const ip = await fetchIp()
        reject(ip)
      }

      if ('geolocation' in navigator) {
        const success = (pos: {coords: any}) => {
          const crd = pos.coords
          const city = {
            lat: crd.latitude,
            long: crd.longitude,
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
    try {
      const city = await getCoords()
      setCoordinates(city)
    } catch (ip) {
      setIp(ip)
      console.debug(ip)
    }
  }, [setCoordinates, setIp])

  useEffect(() => {
    if (coordinates.lat === Infinity && coordinates.long === Infinity && !coordinatesDone) {
      saveCoords()
      setCoordinatesDone(true)
    }
  }, [coordinates.lat, coordinates.long, coordinatesDone, saveCoords, setCoordinatesDone])

  return {coordinates, ip}
}

export default useGeolocation
