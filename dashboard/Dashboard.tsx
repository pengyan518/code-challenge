import {ReactNode, useEffect, useState} from 'react'
import {Cities} from './Cities'
import {useMainContext} from '../contexts/MainContext'

const Dashboard = () => {
  const {forecastday} = useMainContext()
    console.debug('forecastday2:', forecastday)

  return (
    <div className="w-full mt-2">
      <div className="mx-auto cities__wrapper">{forecastday.length === 0 ? <div className="a-center">Loading...</div> : <Cities forecastday={forecastday} />}</div>
    </div>
  )
}

export {Dashboard}
