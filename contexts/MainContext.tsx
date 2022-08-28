import React, {createContext, useContext, useState, ReactNode} from 'react'

type ContextProps = {
  children?: ReactNode
}

type ReducerProps = {
  city: string
  forecastday: any[]
  showSuggestion: boolean
  hoursDetail: {}
  currentIndex: number
  swipeGroupLength: number
  swipeCount: number
  goToPositionFn: (c?: any) => void
}
type ActionProps = {
  setCurrentCity: (c?: any) => void
  setForecastday: (c?: any) => void
  setShowSuggestion: (c?: any) => void
  setHoursDetail: (c?: any) => void
  setCurrentIndex: (c?: any) => void
  setSwipeGroupLength: (c?: any) => void
  setSwipeCount: (c?: any) => void
  setGoToPositionFn: (c?: any) => void
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
  currentIndex: 0,
  swipeGroupLength: 5,
  swipeCount: 0,
  goToPositionFn: (_value: {}) => {},
  setCurrentCity: (_value: string) => {},
  setForecastday: (_value: []) => {},
  setShowSuggestion: (_value: boolean) => {},
  setHoursDetail: (_value: {}) => {},
  setCurrentIndex: (_value: {}) => {},
  setSwipeGroupLength: (_value: {}) => {},
  setSwipeCount: (_value: {}) => {},
  setGoToPositionFn: (_value: {}) => {},
}

const GlobalContext = createContext(initialStateMain)
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  const [forecastday, setForecastday] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeGroupLength, setSwipeGroupLength] = useState(0)
  const [goToPositionFn, setGoToPositionFn] = useState((func: any) => {})
  const [swipeCount, setSwipeCount] = useState(0)
  const [hoursDetail, setHoursDetail] = useState({
    city: '',
    hour: [],
    date: '',
  })
  const reducer: ReducerProps = {city, forecastday, showSuggestion, hoursDetail, currentIndex, swipeGroupLength, swipeCount, goToPositionFn}
  const action: ActionProps = {setCurrentCity, setForecastday, setShowSuggestion, setHoursDetail, setCurrentIndex, setSwipeGroupLength, setSwipeCount, setGoToPositionFn}
  return <GlobalContext.Provider value={{...reducer, ...action}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
