import {useMemo} from 'react'
import {OneDay} from '../dashboard/OneDay'
import {useMainContext} from '../contexts/MainContext'

type CityDaysProps = {
  city: string
}

const CurrentCityDays = (props: CityDaysProps) => {
  const {forecastday} = useMainContext()
  const oneCity = useMemo(() => forecastday.filter(city => city.city === props.city)[0], [forecastday, props.city])

  return (
    <div key={oneCity.city} className="w-full mt-2">
      <div className="grid city-days--grid">
        {oneCity.days.length > 0 &&
          oneCity.days.map((oneDay: {date_epoch: string}) => <OneDay key={oneDay.date_epoch} oneDay={oneDay} city={oneCity.city} />)}
      </div>
    </div>
  )
}

export {CurrentCityDays}
