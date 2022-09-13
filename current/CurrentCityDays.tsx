import {useCallback, useMemo, useRef} from 'react'
import {OneDay} from './OneDay'
import {useMainContext} from '../contexts/MainContext'
import Curve from '../curve'
import useResize from '../hooks/Swipe/useResize'
import useRect from '../hooks/Swipe/useRect'

type CityDaysProps = {
  city: string
}

const CurrentCityDays = (props: CityDaysProps) => {
  const {forecastday} = useMainContext()

  const oneCity = useMemo(() => forecastday.filter(city => city.city === props.city)[0], [forecastday, props.city])
  const curve = useCallback(
    (itemWidth: number, itemHeight: number, baseHeight: number) =>
      oneCity.days.map((oneDay: {day: any}, index: number) => {
        const {
          day: {avgtemp_f},
        } = oneDay
        return `${index * itemWidth + itemWidth / 2},${itemHeight - avgtemp_f - baseHeight}`
      }),
    [oneCity.days]
  )

  const {size, root, changeSize} = useRect<HTMLDivElement>([])


  useResize(()=>{
    changeSize()
  })

  return (
    <div key={oneCity.city} className="w-full mt-4">
      <div className="grid relative">
        {oneCity.days.length > 0 && (
          <>
            <Curve curve={curve(size.width/5, 150, 30)} itemHeight={150} itemWidth={size.width/5} baseHeight={30} />
            <div className="city-days--grid grid relative z-10" ref={root}>
              {oneCity.days.map((oneDay: {date_epoch: string}) => (
                <OneDay key={oneDay.date_epoch} oneDay={oneDay} city={oneCity.city} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export {CurrentCityDays}
