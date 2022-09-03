import {ReactNode, useCallback, useEffect, useState} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useGlobalKeyboardEvent} from '../hooks/useGlobalKeyboardEvent'

type SearchProps = {
  children?: ReactNode
}

const Search = (props: SearchProps) => {
  const {setShowSearchPopup} = useMainContext()
  const handleOpenSearch = useCallback(() => {
    setShowSearchPopup(true)
  }, [setShowSearchPopup])

  useGlobalKeyboardEvent()

  return (
    <div className="mx-auto relative search__wrapper">
      <button className="DocSearch DocSearch-Button" onClick={handleOpenSearch}>
        <span className="DocSearch-Button-Container">
          <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>
          <span className="DocSearch-Button-Placeholder">Search</span>
        </span>
        <span className="DocSearch-Button-Keys">
          <kbd className="DocSearch-Button-Key">⌘</kbd>
          <kbd className="DocSearch-Button-Key">K</kbd>
        </span>
      </button>
    </div>
  )
}

export {Search}
