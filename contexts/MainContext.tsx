import React, {createContext, useContext, useState, ReactNode} from 'react'


type ContextProps = {
  children?: ReactNode
}
// type InitialProps = {
//   test?: number
// }

// @ts-ignore
const GlobalContext = createContext()
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [city, setCurrentCity] = useState('12771')
  return <GlobalContext.Provider value={{city, setCurrentCity}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
