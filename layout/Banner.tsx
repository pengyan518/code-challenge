import {ReactNode, useCallback} from 'react'
import config from '../config'

type IBannerProps = {
  location?: any
  current?: any
  children?: ReactNode
  localtime?: string
  condition?: any
  feelslike_f?: any
  temp_f?: any
}

const Banner = (props: IBannerProps) => {
  const {temp_f, condition, feelslike_f, location, localtime} = props
  const {text, icon} = condition
  const {name, region} = location

  const convertText = useCallback(
    (string: string) =>
      string
        .split(' ')
        .map((s: string | any[]) => `${s[0].toUpperCase()}${s.slice(1)}`)
        .join(''),
    []
  )

  const convertToImageText = useCallback(
    (string: string) => {
      if (string.toLowerCase().includes('rain')) return 'Rain'
      return convertText(string)
    },
    [convertText],
  );


  const conditionWrapper = {
    backgroundImage: `url(${config.weatherImage}${convertToImageText(text)}${config.weatherImageParameter})`,
  }
  return (
    <div className="conditions--large mx-auto" style={conditionWrapper}>
      <header className="conditions--header">
        {name}, {region}
      </header>
      <div className="conditions--body w-full grid">
        <div>
          <div>{localtime}</div>
          <div className="temperature-value">{temp_f}°</div>
          <div>{text}</div>
          <div className="conditions-feels">{feelslike_f && <span>Feels Like {feelslike_f}°</span>}</div>
        </div>
        <img src={icon} alt={text} width={64} height={64} />
      </div>
    </div>
  )
}

export {Banner}
