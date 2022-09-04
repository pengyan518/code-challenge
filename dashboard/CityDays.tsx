import {useRef} from 'react'

import {OneDay} from './OneDay'
import Swipe, {SwipeRef} from '../Swipe/Swipe'
import SwipeItem from '../Swipe/SwipeItem'

type CityDaysProps = {
  forecastday?: any[]
}

const CityDays = (props: CityDaysProps) => {
  const swipeRef = useRef<SwipeRef>(null)
  const swipeWrapper = {
    height: window.innerWidth < 768 ? '180vw' : 900
  }
  return (
    <Swipe ref={swipeRef} autoplay={0} vertical={true} style={swipeWrapper}>
      {props.forecastday &&
        props.forecastday.map(oneCity => {
          return (
            <SwipeItem key={oneCity.city}>
              <>
                <div className="">{oneCity.city}</div>
                <div className="grid city-days--grid">
                {oneCity.days.length > 0 &&
                  oneCity.days.map((oneDay: {date_epoch: string}) => (
                    <OneDay key={oneDay.date_epoch} oneDay={oneDay} city={oneCity.city} />
                  ))}
                </div>
              </>
            </SwipeItem>
          )
        })}
    </Swipe>
  )
}

export {CityDays}
