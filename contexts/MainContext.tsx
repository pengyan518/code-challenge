import React, {createContext, useContext, useState, ReactNode} from 'react'

type ContextProps = {
  children?: ReactNode
}

type ReducerProps = {
  city: string
  forecastday: any[]
  showSuggestion: boolean
}
type ActionProps = {
  setCurrentCity: (c?: any) => void
  setForecastday: (c?: any) => void
  setShowSuggestion: (c?: any) => void
}
const initialStateMain = {
  city: '',
  forecastday: [],
  showSuggestion: false,
  setCurrentCity: (_value: string) => {},
  setForecastday: (_value: []) => {},
  setShowSuggestion: (_value: boolean) => {},
}

const GlobalContext = createContext(initialStateMain)
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  const [forecastday, setForecastday] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const reducer: ReducerProps = {city, forecastday, showSuggestion}
  const action: ActionProps = {setCurrentCity, setForecastday, setShowSuggestion}
  return <GlobalContext.Provider value={{...reducer, ...action}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
