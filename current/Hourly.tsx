import {useMainContext} from '../contexts/MainContext'
import Curve from '../curve'
import {useCallback} from 'react'

const Hourly = () => {
  const {hoursDetail} = useMainContext()
  const hours = hoursDetail.hour.filter((hour: any, index: number) => index < 12)
  const curve = useCallback(
    (itemWidth: number, itemHeight: number, baseHeight: number) =>
      hours.map((oneHour: {temp_f: any}, index: number) => {
        const {temp_f} = oneHour
        return `${index * itemWidth + itemWidth / 2},${itemHeight - temp_f - baseHeight}`
      }),
    [hours]
  )

  return (
    <div className="hours-grid-wrapper mx-auto mt-4 relative">
      {hoursDetail.hour.length > 0 && (
        <>
          <Curve curve={curve(100, 150, 20)} />
          <div className="hours-grid grid relative z-10">
            {hoursDetail.hour
              .filter((hour: any, index: number) => index < 12)
              .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any, chance_of_rain: number}) => {
                const {condition, temp_f, time_epoch, time, chance_of_rain} = oneHour
                return (
                  <div key={time_epoch} className="text-center">
                    <div>{time.split(' ')[1]}</div>
                    <div className="hour-temp">{temp_f}°</div>
                    <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
                    <div>{chance_of_rain > 0 && <span>{chance_of_rain}%</span>}</div>
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
