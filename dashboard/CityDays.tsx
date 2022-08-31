import {useRef} from 'react'

import {OneDay} from './OneDay'
import Swipe, {SwipeRef} from '../Swipe/Swipe'
import SwipeItem from '../Swipe/SwipeItem'

type CityDaysProps = {
  forecastday?: any[]
}

const CityDays = (props: CityDaysProps) => {
  const swipeRef = useRef<SwipeRef>(null)
  return (
    <Swipe ref={swipeRef} autoplay={0}>
      {props.forecastday &&
        props.forecastday.map(oneCity => {
          return (
            <SwipeItem key={oneCity.city}>
              <div className="grid-wrapper w-full">
                <div className="a-center">{oneCity.city}</div>
                {oneCity.days.length > 0 &&
                  oneCity.days.map((oneDay: {date_epoch: string}) => (
                    <OneDay key={oneDay.date_epoch} oneDay={oneDay} city={oneCity.city} />
                  ))}
              </div>
            </SwipeItem>
          )
        })}
    </Swipe>
  )
}

export {CityDays}
