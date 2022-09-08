import {useRef} from 'react'

import Swipe, {SwipeRef} from '../Swipe/Swipe'
import SwipeItem from '../Swipe/SwipeItem'
import useTargetCity from '../hooks/useTargetCity'
import {OneCity} from './OneCity'

type CityDaysProps = {
  forecastday?: any[]
}

const Cities = (props: CityDaysProps) => {
  const swipeRef = useRef<SwipeRef>(null)
  const swipeWrapper = {
    // height: window.innerWidth < 768 ? '180vw' : 900
  }

  return (
    <Swipe ref={swipeRef} autoplay={0} vertical={false} style={swipeWrapper}>
      {props.forecastday &&
        props.forecastday.map(oneCity => {
          return (
            <SwipeItem key={oneCity.city}>
              <OneCity oneCity={oneCity} />
            </SwipeItem>
          )
        })}
    </Swipe>
  )
}

export {Cities}
