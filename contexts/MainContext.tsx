import React, {createContext, useContext, useState, ReactNode} from 'react'

type ContextProps = {
  children?: ReactNode
}

type ReducerProps = {
  city: string
  forecastday: any[]
  showSuggestion: boolean
  hoursDetail: {}
}
type ActionProps = {
  setCurrentCity: (c?: any) => void
  setForecastday: (c?: any) => void
  setShowSuggestion: (c?: any) => void
  setHoursDetail: (c?: any) => void
}
const initialStateMain = {
  city: '',
  forecastday: [],
  showSuggestion: false,
  hoursDetail: {
    city: '',
    hour: [],
    date: '',
  },
  setCurrentCity: (_value: string) => {},
  setForecastday: (_value: []) => {},
  setShowSuggestion: (_value: boolean) => {},
  setHoursDetail: (_value: {}) => {},
}

const GlobalContext = createContext(initialStateMain)
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  const [forecastday, setForecastday] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [hoursDetail, setHoursDetail] = useState({
    city: '',
    hour: [],
    date: '',
  })
  const reducer: ReducerProps = {city, forecastday, showSuggestion, hoursDetail}
  const action: ActionProps = {setCurrentCity, setForecastday, setShowSuggestion, setHoursDetail}
  return <GlobalContext.Provider value={{...reducer, ...action}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
