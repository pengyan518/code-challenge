import {ReactNode, useCallback, useEffect, useState} from 'react'
import Link from 'next/link'
import {Search} from '../Search/Search'
import HomeBtn from '../Icons/Home'

type HeaderProps = {
  children?: ReactNode
}

const Header = (props: HeaderProps) => {
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
