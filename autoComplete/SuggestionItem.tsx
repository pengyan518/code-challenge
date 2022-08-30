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
    hoursDetail,
    setHoursDetail,
    detailPage,
    setDetailPage,
  } = useMainContext()
  const {fetchInitial, forecastday, city} = useFetchCity()

  const showHours = useCallback((hour, date) => {
    setDetailPage(true)
    setHoursDetail({
      city: name,
      hour,
      date,
    })
  }, [name, setDetailPage, setHoursDetail])

  console.debug('forecastday', forecastday)

  const handleClick = useCallback(() => {
    setShowSuggestion(false)
    document.querySelector('#search-form').value = ''

    const feeds = forecastday.map(item => item.city)
    if (feeds.includes(name)) {
      const cityIndex = feeds.indexOf(name)
      showHours(forecastday[cityIndex].days[0].hour, forecastday[cityIndex].days[0].date)
    } else if (swipeCount < 20) {
      fetchInitial(name)
      const cityIndex = forecastday.length - 1
      showHours(forecastday[cityIndex].days[0].hour, forecastday[cityIndex].days[0].date)
      // if (swipeCount >= swipeGroupLength && !searchResultInStore) {
      //   setGoToTargetPage(true)
      // }
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
  }, [
    fetchInitial,
    forecastday,
    name,
    searchResultInStore,
    setGoToTargetPage,
    setLimit,
    setSearchResultInStore,
    setShowSuggestion,
    setTargetPage,
    swipeCount,
    swipeGroupLength,
  ])

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
