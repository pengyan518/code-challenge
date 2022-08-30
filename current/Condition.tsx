import {useMainContext} from '../contexts/MainContext'
interface IProps {
  current: any
  location: any
}
const Condition: React.FC<IProps> = ({current, location}) => {
  const {name, localtime} = location
  const {temp_f, condition, feelslike_f} = current
  const {text, icon} = condition
  return (
    <div className="mx-auto a-center">
      <div>{name}</div>
      <div>{localtime}</div>
      <div>{temp_f}°</div>
      <div>{text}</div>
      <div>Feels Like {feelslike_f}°</div>
      <img src={icon} alt={text} width={64} height={64} />
    </div>
  )
}

export {Condition}
