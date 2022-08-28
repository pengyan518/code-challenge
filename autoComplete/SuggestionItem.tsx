import React, {memo, useCallback, FC} from 'react'
import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  name: string
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({name}) => {
  const {
    setShowSuggestion,
    swipeCount,
    swipeGroupLength,
    targetPage,
    goToTargetPage,
    setGoToTargetPage,
    setTargetPage,
    searchResultInStore,
    setSearchResultInStore,
    setLimit,
  } = useMainContext()
  const {fetchInitial, forecastday, city} = useFetchCity()
  const handleClick = useCallback(() => {
    // setShowSuggestion(false)
    // document.querySelector('#search-form').value = ''

    const feeds = forecastday.map(item => item.city)
    if (feeds.includes(name)) {
      setSearchResultInStore(true)
      setTargetPage(feeds.indexOf(name))
    } else if (swipeCount < 20) {
      fetchInitial(name)
      if (swipeCount >= swipeGroupLength && !searchResultInStore) {
        setGoToTargetPage(true)
      }
    } else {
      setLimit(true)
      alert('Up to 20 Cities!')
    }
    // if(searchResultInStore) {
    // }
  }, [fetchInitial, forecastday, name, searchResultInStore, setGoToTargetPage, setSearchResultInStore, setShowSuggestion, swipeCount, swipeGroupLength])

  return (
    <li className="hand">
      <a role="button" tabIndex={0} onClick={handleClick}>
        <div className="AutocompleteItem" dangerouslySetInnerHTML={{__html: name}} />
      </a>
    </li>
  )
})

SuggestionItem.displayName = 'SuggestionItem'

export default SuggestionItem
