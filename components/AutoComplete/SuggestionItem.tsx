import React, {memo, useCallback, FC} from 'react'
import Link from 'next/link'
// import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../../contexts/MainContext'
import useTargetCity from '../../hooks/useTargetCity'

type SuggestionItemProps = {
  item: {
    name: string
    region: string
    fromSearchBox: boolean
  }
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({item}) => {
  const {setShowSuggestion, setShowSearchPopup} = useMainContext()
  item.fromSearchBox = true
  const {handleTargetCityAction} = useTargetCity({item})

  const handleClick = useCallback(() => {
    handleTargetCityAction()

    // setShowSuggestion(false)
    // setShowSearchPopup(false)
    // @ts-ignore
    document.querySelector('#search-form').value = ''
  }, [handleTargetCityAction, setShowSearchPopup, setShowSuggestion])

  return (
    <Link href="/">
      <li className="DocSearch-Hit" id="docsearch-item-0" role="option" aria-selected="false">
        <a role="button" tabIndex={0} onClick={handleClick} className="hand">
          <div className="DocSearch-Hit-Container">
            {/*<div className="DocSearch-Hit-icon">*/}
            {/*  <svg width="20" height="20" viewBox="0 0 20 20">*/}
            {/*  </svg>*/}
            {/*</div>*/}
            <div className="DocSearch-Hit-content-wrapper">
              <span className="DocSearch-Hit-title" dangerouslySetInnerHTML={{__html: item.name}} />
              <span className="DocSearch-Hit-path">{item.region}</span>
            </div>
            <div className="DocSearch-Hit-action">
              <svg className="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20">
                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3v4c0 2-2 4-4 4H2" />
                  <path d="M8 17l-6-6 6-6" />
                </g>
              </svg>
            </div>
          </div>
        </a>
      </li>
    </Link>
  )
})

SuggestionItem.displayName = 'SuggestionItem'

export default SuggestionItem
