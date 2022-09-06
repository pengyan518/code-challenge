import {ReactNode, useEffect, useState} from 'react'
import {CityDays} from './CityDays'
import {useMainContext} from '../contexts/MainContext'

const Dashboard = () => {
  const {forecastday} = useMainContext()
    console.debug('forecastday2:', forecastday)

  return (
    <div className="w-full">
      <div className="mx-auto current--wrapper p-4">{forecastday.length === 0 ? <div className="a-center">Loading...</div> : <CityDays forecastday={forecastday} />}</div>
    </div>
  )
}

export {Dashboard}
