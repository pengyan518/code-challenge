import {useMainContext} from '../contexts/MainContext'
interface IProps {
  location: any
}
const FutureCondition: React.FC<IProps> = ({location}) => {
  const {futureInfo} = useMainContext()
  const {date, day} = futureInfo
  const {name, localtime} = location
  const {avgtemp_f, condition} = day
  const {text, icon} = condition
  return (
    <div className="condition--body mx-auto a-center">
      <div>{name}</div>
      <div>{date}</div>
      <div>{avgtemp_f}°</div>
      <div>{text}</div>
      <img src={icon} alt={text} width={64} height={64} />
    </div>
  )
}

export {FutureCondition}
