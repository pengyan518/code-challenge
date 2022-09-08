import useTargetCity from '../hooks/useTargetCity'

type CityDaysProps = {
  oneCity?: any
}
const OneCity = ({oneCity}: CityDaysProps) => {
  const {city, current,  location} = oneCity
  const {condition, temp_f} = current
  const item = {
    name: city,
  }
  console.debug(oneCity)
  const {handleTargetCityAction} = useTargetCity({item})
  return (
    <div className="cursor-pointer city__item text-center" onClick={handleTargetCityAction}>
      <div className="">{city}</div>
      <div className="">{location.region}</div>
      <div>
        <div className="text-sm">{condition.text}</div>
        {condition.icon && <img src={`https:${condition.icon}`} alt={condition.text} width={48} height={48} />}
        <div>
          {temp_f}°
        </div>
      </div>
    </div>
  )
}

export {OneCity}
