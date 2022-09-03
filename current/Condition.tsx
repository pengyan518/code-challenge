interface IProps {
  current: any
  location: any
}
const Condition: React.FC<IProps> = ({current, location}) => {
  const {name, region, localtime} = location
  const {temp_f, condition, feelslike_f} = current
  const {text, icon} = condition
  return (
    <div className="conditions--large mx-auto p-4">
      <header className="conditions--header">{name}, {region}</header>
      <div className="conditions--body w-full grid">
        <div>
          <div>{localtime}</div>
          <div className="temperature-value">{temp_f}°</div>
          <div>{text}</div>
          <div>Feels Like {feelslike_f}°</div>
        </div>
        <img src={icon} alt={text} width={64} height={64} />
      </div>
    </div>
  )
}

export {Condition}
