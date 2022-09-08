import {ReactNode, useCallback, useEffect, useState} from 'react'
import Link from 'next/link'
import {useMainContext} from '../contexts/MainContext'
import {Search} from '../search/Search'
import ListUl from '../icons/ListUl'
import HomeBtn from '../icons/Home'

type HeaderProps = {
  children?: ReactNode
}

const Header = (props: HeaderProps) => {
  // const {setDetailPage, setTwelveHoursPage} = useMainContext()
  // const handleBack = useCallback(() => {
  //   setDetailPage(false)
  //   setTwelveHoursPage(false)
  // }, [setDetailPage])
  //
  // const handleBackHome = useCallback(() => {
  //   setDetailPage(true)
  //   setTwelveHoursPage(false)
  // }, [setDetailPage, setTwelveHoursPage])

  return (
    <header className="w-full bd-navbar">
      <div className="header__wrapper bd-gutter flex">
        <Link href="/">
          <div className="cursor-pointer text-white items-center flex">
            {/*  @ts-ignore */}
            <HomeBtn className="h-6 w-6 text-sky-600 ml-2 mt-1" viewBox="0 0 16 16" />
          </div>
        </Link>
        <Search />
      </div>
    </header>
  )
}

export {Header}
