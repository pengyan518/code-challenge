import React, {memo, useCallback, FC} from 'react'
import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  name: string
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({name}) => {
  const {setShowSuggestion} = useMainContext()
  const {city, setCurrentCity, fetchInitial} = useFetchCity()
  const getCityData = useCallback(() => {
    setCurrentCity(name)
    fetchInitial(name)
    setShowSuggestion(false)
  }, [fetchInitial, name, setCurrentCity, setShowSuggestion])

  return (
    <li className="hand">
      <a role="button" tabIndex={0} onClick={getCityData}>
        <div className="AutocompleteItem" dangerouslySetInnerHTML={{__html: name}} />
      </a>
    </li>
  )
})

SuggestionItem.displayName = 'SuggestionItem'

export default SuggestionItem
