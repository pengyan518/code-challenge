import React, {memo, useCallback, FC} from 'react'
import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  name: string
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({name}) => {
  const {setShowSuggestion} = useMainContext()
  const {fetchInitial} = useFetchCity()
  const handleClick = useCallback(() => {
    const indicators = document.querySelectorAll('.swipe__dot')
    fetchInitial(name)
    // setShowSuggestion(false)
    // document.querySelector('#search-form').value = ''
    if (indicators && indicators.length) window.goToPosition({position: (indicators.length - 1) * window.groupLength})()
    // if (indicators && indicators.length > 1) window.goToPosition({position: window.count})()
  }, [fetchInitial, name, setShowSuggestion])

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
