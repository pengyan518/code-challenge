import {useMainContext} from '../../contexts/MainContext'
import {Banner} from '../layout/Banner'
interface IProps {
  location: any
}
const FutureCondition: React.FC<IProps> = ({location}) => {
  const {futureInfo} = useMainContext()
  const {date, day} = futureInfo
  const {avgtemp_f, condition} = day
  return <Banner temp_f={avgtemp_f} condition={condition} localtime={date} location={location} />
}

export {FutureCondition}
