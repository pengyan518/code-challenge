import {HoursView} from './HourView'
import {useMainContext} from '../contexts/MainContext'
import {TwelveHoursWrapper} from './TwelveHoursWrapper'

interface OneHourProps {
  time_epoch: any
}

const TwelveHoursView = () => {
  const {hoursDetail} = useMainContext()

  return (
    <div className="twelve-hours__container mx-auto mt-4">
      <div className="hours-grid-wrapper">
        {hoursDetail.hour.length > 0 && (
          <div className="twelve-hours__grid">
            <div>{hoursDetail.date}</div>
            <div>{hoursDetail.city}</div>
            <TwelveHoursWrapper>
              {hoursDetail.hour.map((oneHour: OneHourProps) => {
                const {time_epoch} = oneHour
                return <HoursView key={time_epoch} oneHour={oneHour} />
              })}
            </TwelveHoursWrapper>
          </div>
        )}
      </div>
    </div>
  )
}

export {TwelveHoursView}
