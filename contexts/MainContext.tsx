import React, {createContext, useContext, useState, ReactNode} from 'react'

type ContextProps = {
  children?: ReactNode
}

// @ts-ignore
const GlobalContext = createContext()
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  const [forecastday, setForecastday] = useState([])
  return <GlobalContext.Provider value={{city, setCurrentCity, forecastday, setForecastday}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
