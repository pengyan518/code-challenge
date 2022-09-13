import React, {ReactNode, useCallback, useMemo} from 'react'

interface IProps {
  oneHour: any
  index: number
  myClassName: string
}

const OneHour: React.FC<IProps> = ({oneHour, index, myClassName}) => {
  const {condition, temp_f, time_epoch, time, chance_of_rain} = oneHour
  const hourDisplay = () => {
    const display = new Date(time).getHours()
    if (display > 12) return `${display}p`
    return `${display}a`
  }
  return (
    <div key={time_epoch} className={myClassName}>
      <div>{hourDisplay()}</div>
      <div className="hour-temp">{temp_f}°</div>
      <img src={`https://${condition.icon}`} alt="" width={48} height={48} />
      <div>{chance_of_rain > 0 && <span>{chance_of_rain}%</span>}</div>
    </div>
  )
}

export {OneHour}
