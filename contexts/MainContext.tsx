import React, {createContext, useContext, useState, ReactNode} from 'react'

type ContextProps = {
  children?: ReactNode
}
interface FuturePros {
  day: any
  date: string
}
interface HoursDetailPros {
  city: string
  hour: any
  date: string
}
interface CoordinatesProps {
  lat: number
  long: number
}
interface ReducerProps {
  city: string
  current: {}
  future: boolean
  futureInfo: FuturePros
  location: {}
  forecastday: any[]
  showSuggestion: boolean
  hoursDetail: HoursDetailPros
  currentIndex: number
  swipeGroupLength: number
  swipeCount: number
  goToTargetPage: boolean
  targetPage: number
  searchResultInStore: boolean
  limit: boolean
  detailPage: boolean
  coordinatesDone: boolean
  coordinates: CoordinatesProps
  ip: any
}
interface ActionProps {
  setCurrentCity: (c?: any) => void
  setCurrent: (c?: any) => void
  setFuture: (c?: any) => void
  setFutureInfo: (c?: any) => void
  setLocation: (c?: any) => void
  setForecastday: (c?: any) => void
  setShowSuggestion: (c?: any) => void
  setHoursDetail: (c?: any) => void
  setCurrentIndex: (c?: any) => void
  setSwipeGroupLength: (c?: any) => void
  setSwipeCount: (c?: any) => void
  setGoToTargetPage: (c?: any) => void
  setTargetPage: (c?: any) => void
  setSearchResultInStore: (c?: any) => void
  setLimit: (c?: any) => void
  setDetailPage: (c?: any) => void
  setCoordinatesDone: (c?: any) => void
  setCoordinates: (c?: any) => void
  setIp: (c?: any) => void
}


const initialStateMain: ReducerProps & ActionProps = {
  city: '',
  current: '',
  future: false,
  futureInfo: {
    day: {},
    date: '',
  },
  location: '',
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
  goToTargetPage: false,
  targetPage: 0,
  searchResultInStore: false,
  limit: false,
  detailPage: false,
  coordinatesDone: false,
  coordinates: {
    lat: Infinity,
    long: Infinity,
  },
  ip: null,
  setCurrentCity: (_value: string) => {},
  setCurrent: (_value: string) => {},
  setFuture: (c?: any) => {},
  setFutureInfo: (c?: any) => {},
  setLocation: (_value: string) => {},
  setForecastday: (_value: []) => {},
  setShowSuggestion: (_value: boolean) => {},
  setHoursDetail: (_value: {}) => {},
  setCurrentIndex: (_value: {}) => {},
  setSwipeGroupLength: (_value: {}) => {},
  setSwipeCount: (_value: {}) => {},
  setGoToTargetPage: (_value: boolean) => {},
  setTargetPage: (c?: number) => {},
  setSearchResultInStore: (c?: boolean) => {},
  setLimit: (c?: boolean) => {},
  setDetailPage: (c?: boolean) => {},
  setCoordinatesDone: (c?: boolean) => {},
  setCoordinates: (c?: unknown) => {},
  setIp: (c?: unknown) => {},
}
const GlobalContext = createContext(initialStateMain)
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  const [current, setCurrent] = useState({})
  const [future, setFuture] = useState(false)
  const [futureInfo, setFutureInfo] = useState<FuturePros>({date: '', day: undefined})
  const [location, setLocation] = useState({})
  const [forecastday, setForecastday] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeGroupLength, setSwipeGroupLength] = useState(0)
  const [goToTargetPage, setGoToTargetPage] = useState(false)
  const [targetPage, setTargetPage] = useState(0)
  const [swipeCount, setSwipeCount] = useState(0)
  const [searchResultInStore, setSearchResultInStore] = useState(false)
  const [limit, setLimit] = useState(false)
  const [detailPage, setDetailPage] = useState(true)
  const [coordinatesDone, setCoordinatesDone] = useState(false)
  const [coordinates, setCoordinates] = useState<CoordinatesProps>({
    lat: Infinity,
    long: Infinity,
  })
  const [ip, setIp] = useState(null)
  const [hoursDetail, setHoursDetail] = useState<HoursDetailPros>({
    city: '',
    hour: [],
    date: '',
  })

  const reducer: ReducerProps = {
    city,
    current,
    future,
    futureInfo,
    location,
    forecastday,
    showSuggestion,
    hoursDetail,
    currentIndex,
    swipeGroupLength,
    swipeCount,
    goToTargetPage,
    targetPage,
    searchResultInStore,
    limit,
    detailPage,
    coordinatesDone,
    coordinates,
    ip,
  }
  const action: ActionProps = {
    setCurrentCity,
    setCurrent,
    setFuture,
    setFutureInfo,
    setLocation,
    setForecastday,
    setShowSuggestion,
    setHoursDetail,
    setCurrentIndex,
    setSwipeGroupLength,
    setSwipeCount,
    setGoToTargetPage,
    setTargetPage,
    setSearchResultInStore,
    setLimit,
    setDetailPage,
    setCoordinatesDone,
    setCoordinates,
    setIp,
  }
  return <GlobalContext.Provider value={{...reducer, ...action}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
