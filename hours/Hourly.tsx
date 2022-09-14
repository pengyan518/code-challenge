import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useMainContext} from '../contexts/MainContext'
import Curve from '../curve'
import {OneHour} from './OneHour'
import {HoursWrapper} from './HoursWrapper'

const Hourly = () => {
  const [style, setStyle] = useState({})
  const {hoursDetail} = useMainContext()
  const hoursRef = useRef<any>(null)
  const wrapperRef = useRef<any>(null)
  const curve = useCallback(
    (itemWidth: number, itemHeight: number, baseHeight: number) =>
      hoursDetail.hour.map((oneHour: {temp_f: any}, index: number) => {
        const {temp_f} = oneHour
        return `${index * itemWidth + itemWidth / 2},${itemHeight - temp_f - baseHeight}`
      }),
    [hoursDetail.hour]
  )
  // const onScrollHandle = useCallback((e: any) => {
  //   console.debug(wrapperRef.current.scrollLeft)
  // }, [])

  // useEffect(() => {
  //   setStyle(hoursRef.current.transformStyle)
  // }, [])

  useEffect(() => {
    wrapperRef.current.scrollTo(hoursRef.current.currentTime * 100, 0)
  }, [])

  return (
    <div className="hours-grid-wrapper mx-auto mt-4 relative" ref={wrapperRef}>
      {hoursDetail.hour.length > 0 && (
        <>
          <Curve curve={curve(100, 150, 20)} baseHeight={20} />
          <HoursWrapper ref={hoursRef}>
            {hoursDetail.hour.map(
              (oneHour: {condition: any; temp_f: any; time_epoch: any; time: any; chance_of_rain: number}, index: any) => {
                return <OneHour oneHour={oneHour} key={oneHour.time_epoch} index={index} />
              }
            )}
          </HoursWrapper>
        </>
      )}
    </div>
  )
}

export {Hourly}
