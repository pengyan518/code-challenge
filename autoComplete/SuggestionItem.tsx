import React, {memo, useCallback, FC} from 'react'
import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  name: string
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({name}) => {
  const {setShowSuggestion, swipeCount, swipeGroupLength, targetPage, goToTargetPage, setGoToTargetPage, setTargetPage, searchResultInStore} = useMainContext()
  const {fetchInitial} = useFetchCity()
  const handleClick = useCallback(() => {
    fetchInitial(name)
    // setShowSuggestion(false)
    // document.querySelector('#search-form').value = ''
    if (swipeCount >= swipeGroupLength && !searchResultInStore) {
      setGoToTargetPage(true)
    }
    if(searchResultInStore) {
      // setTargetPage()
    }
  }, [fetchInitial, name, searchResultInStore, setGoToTargetPage, swipeCount, swipeGroupLength])

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
