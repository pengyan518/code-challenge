import React, {createContext, useContext, useState, ReactNode} from 'react'


type ContextProps = {
  children?: ReactNode
}
type InitialProps = {
  test?: number
}

// @ts-ignore
const GlobalContext = createContext()
const useMainContext = () => useContext(GlobalContext)

const MainContext: React.FC<ContextProps> = ({children}) => {
  const [value, setValue] = useState<InitialProps>({test: 0})
  return <GlobalContext.Provider value={{value, setValue}}>{children}</GlobalContext.Provider>
}

export {MainContext, useMainContext}
