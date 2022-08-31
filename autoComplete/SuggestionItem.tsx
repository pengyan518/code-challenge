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
    setLimit,
    setHoursDetail,
    setDetailPage,
  } = useMainContext()
  const {fetchInitial, forecastday, city} = useFetchCity()

  const showHours = useCallback(
    (hour: any, date: any) => {
      setDetailPage(true)
      setHoursDetail({
        city: name,
        hour,
        date,
      })
    },
    [name, setDetailPage, setHoursDetail]
  )

  const handleClick = useCallback(() => {
    // setShowSuggestion(false)
    // @ts-ignore
    // document.querySelector('#search-form').value = ''

    const feeds = forecastday.map(item => item.city)
    if (feeds.includes(name)) {
      const cityIndex = feeds.indexOf(name)
      showHours(forecastday[cityIndex].days[0].hour, forecastday[cityIndex].days[0].date)
    } else if (swipeCount < 20) {
      fetchInitial(name)
    } else {
      setLimit(true)
      alert('Up to 20 Cities!')
    }


    // const feeds = forecastday.map(item => item.city)
    // if (feeds.includes(name)) {
    //   setSearchResultInStore(true)
    //   setTargetPage(feeds.indexOf(name))
    // } else if (swipeCount < 20) {
    //   fetchInitial(name)
    //   if (swipeCount >= swipeGroupLength && !searchResultInStore) {
    //     setGoToTargetPage(true)
    //   }
    // } else {
    //   setLimit(true)
    //   alert('Up to 20 Cities!')
    // }
  }, [fetchInitial, forecastday, name, setLimit, setShowSuggestion, showHours, swipeCount])

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
