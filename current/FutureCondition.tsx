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
    <div className="conditions--large mx-auto">
      <header className="conditions--header">{name}</header>
      <div className="conditions--body w-full grid">
        <div>
        <div>{date}</div>
        <div className="temperature-value">{avgtemp_f}°</div>
        <div>{text}</div>
        </div>
        <img src={icon} alt={text} width={64} height={64} />
      </div>
    </div>
  )
}

export {FutureCondition}
