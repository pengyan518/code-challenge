import React, {ReactNode, useCallback, useMemo} from 'react'
import {useMainContext} from '../contexts/MainContext'
import Curve from '../curve'
import {OneHour} from './OneHour'


type HoursWrapperProps = {
  children?: ReactNode
}

const HoursWrapper = (props: HoursWrapperProps) => {

  const newClassName = (child: {props: {index: number}}) => {
    const now = new Date().getHours()
    
    if  (child.props.index > now) {
      return 'text-center active'
    }
    return 'text-center'
  }

  return (
    <div className="hours-grid grid relative z-10">
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement(child as React.ReactElement<any>, {myClassName: newClassName(child)})
      })}
    </div>
  )
}

const Hourly = () => {
  const {hoursDetail} = useMainContext()
  // const hours = hoursDetail.hour.filter((hour: any, index: number) => index < 16 && index > 4)
  const curve = useCallback(
    (itemWidth: number, itemHeight: number, baseHeight: number) =>
      hoursDetail.hour.map((oneHour: {temp_f: any}, index: number) => {
        const {temp_f} = oneHour
        return `${index * itemWidth + itemWidth / 2},${itemHeight - temp_f - baseHeight}`
      }),
    [hoursDetail.hour]
  )

  return (
    <div className="hours-grid-wrapper mx-auto mt-4 relative">
      {hoursDetail.hour.length > 0 && (
        <>
          <Curve curve={curve(100, 150, 20)} baseHeight={20} />
          <HoursWrapper>
            {hoursDetail.hour
              // .filter((hour: any, index: number) => index < 16 && index > 4)
              .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any; chance_of_rain: number}, index: any) => {
                return <OneHour oneHour={oneHour} key={oneHour.time_epoch} index={index} />
              })}
          </HoursWrapper>
        </>
      )}
    </div>
  )
}

export {Hourly}
