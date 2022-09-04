import {Banner} from '../layout/Banner'

interface IProps {
  current: any
  location: any
}
const Condition: React.FC<IProps> = ({current, location}) => {
  const {localtime} = location
  const {temp_f, condition, feelslike_f} = current
  return (
    <Banner current={current} location={location} condition={condition} localtime={localtime} feelslike_f={feelslike_f} temp_f={temp_f} />
  )
}

export {Condition}
