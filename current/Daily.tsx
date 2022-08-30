import {useMainContext} from '../contexts/MainContext'

const Daily = () => {
  const {hoursDetail} = useMainContext()
  return (
    <div className="hours-grid-wrapper mx-auto">
      {hoursDetail.hour.length > 0 && (
        <div className="hours-grid grid" style={{width: 12 * 100}}>
          {hoursDetail.hour
            .filter((hour, index) => index < 12)
            .map(oneHour => {
              const {condition, temp_f, time_epoch, time} = oneHour
              return (
                <div key={time_epoch}>
                  <div>{time.split(' ')[1]}</div>
                  <div>{temp_f}°</div>
                  <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export {Daily}
