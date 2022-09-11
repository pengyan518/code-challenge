import {useMainContext} from '../contexts/MainContext'
import Curve from '../curve'

const Hourly = () => {
  const {hoursDetail} = useMainContext()
  return (
    <div className="hours-grid-wrapper mx-auto mt-4 relative">
      {hoursDetail.hour.length > 0 && (
        <>
          <Curve />
          <div className="hours-grid grid relative z-10">
            {hoursDetail.hour
              .filter((hour: any, index: number) => index < 12)
              .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any}) => {
                const {condition, temp_f, time_epoch, time, chance_of_rain} = oneHour
                return (
                  <div key={time_epoch} className="text-center">
                    <div>{time.split(' ')[1]}</div>
                    <div className="hour-temp">{temp_f}°</div>
                    <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
                    <div>{chance_of_rain > 0 && (<span>{chance_of_rain}%</span>)}</div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export {Hourly}
