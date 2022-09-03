import {ReactNode, useCallback, useEffect, useState} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {Search} from '../search/Search'
import ListUl from '../icons/ListUl'

type HeaderProps = {
  children?: ReactNode
}

const Header = (props: HeaderProps) => {
  const {setDetailPage, current, location, forecastday, future} = useMainContext()
  const handleBack = useCallback(() => {
    setDetailPage(false)
  }, [setDetailPage])

  return (
    <header className="w-full bd-navbar">
      <div className="header__wrapper bd-gutter flex">
        <div className="cursor-pointer text-white items-center flex" onClick={handleBack}>
          {/*  @ts-ignore */}
          <ListUl className="h-6 w-6 text-sky-600 ml-2 mt-1" viewBox="0 0 16 16" />
        </div>
        <Search />
      </div>
    </header>
  )
}

export {Header}
