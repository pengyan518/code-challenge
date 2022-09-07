import {HoursView} from './HourView'
import {useMainContext} from '../contexts/MainContext'

const TwelveHoursView = () => {
  const {hoursDetail, current, location, forecastday} = useMainContext()
  return (
    <div className="twelve-hours__container mx-auto mt-4">
      <div className="hours-grid-wrapper">
        {hoursDetail.hour.length > 0 && (
          <div className="twelve-hours__grid">
            <div>{hoursDetail.date}</div>
            <div>{hoursDetail.city}</div>
            {hoursDetail.hour
              .filter((hour: any, index: number) => index < 12)
              .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any}) => {
                const {condition, temp_f, time_epoch, time} = oneHour
                return <HoursView key={time_epoch} oneHour={oneHour} />
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export {TwelveHoursView}
