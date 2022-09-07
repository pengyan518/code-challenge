import React, {memo, useCallback, FC} from 'react'
import Link from 'next/link'
import {useFetchCity} from '../hooks/useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  item: {
    name: string
    region: string
  }
}
const SuggestionItem: FC<SuggestionItemProps> = memo(({item}) => {
  const {
    setShowSuggestion,
    swipeCount,
    setLimit,
    setHoursDetail,
    setDetailPage,
    setFuture,
    setLocation,
    setFutureInfo,
    setShowSearchPopup,
  } = useMainContext()
  const {fetchInitial, forecastday, city} = useFetchCity()

  const showHours = useCallback(
    (hour: any, date: any) => {
      setDetailPage(true)
      setFuture(true)
      setHoursDetail({
        city: item.name,
        hour,
        date,
      })
    },
    [item.name, setDetailPage, setFuture, setHoursDetail]
  )

  const fetchDetails = useCallback(
    (oneDay: any) => {
      const currentCity: {location: {}; current: {}} = forecastday.filter((city: {city: string}) => city.city === item.name)[0]
      setLocation(currentCity.location)
      setFutureInfo(oneDay)
    },
    [forecastday, item.name, setFutureInfo, setLocation]
  )

  const handleClick = useCallback(() => {
    const feeds = forecastday.map(v => v.city)
    if (feeds.includes(item.name)) {
      const cityIndex = feeds.indexOf(item.name)
      showHours(forecastday[cityIndex].days[0].hour, forecastday[cityIndex].days[0].date)
      fetchDetails(forecastday[cityIndex].days[0])
    } else if (swipeCount < 20) {
      setDetailPage(true)
      fetchInitial(item.name)
    } else {
      setLimit(true)
      alert('Up to 20 Cities!')
    }

    // setShowSuggestion(false)
    // setShowSearchPopup(false)
    // @ts-ignore
    document.querySelector('#search-form').value = ''

    console.debug('forecastday:', forecastday)

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
    fetchDetails,
    fetchInitial,
    forecastday,
    item.name,
    setDetailPage,
    setLimit,
    setShowSearchPopup,
    setShowSuggestion,
    showHours,
    swipeCount,
  ])

  return (
    <Link href="/">
      <li className="DocSearch-Hit" id="docsearch-item-0" role="option" aria-selected="false">
        <a role="button" tabIndex={0} onClick={handleClick} className="hand">
          <div className="DocSearch-Hit-Container">
            {/*<div className="DocSearch-Hit-icon">*/}
            {/*  <svg width="20" height="20" viewBox="0 0 20 20">*/}
            {/*    <path*/}
            {/*      d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"*/}
            {/*      stroke="currentColor"*/}
            {/*      fill="none"*/}
            {/*      fillRule="evenodd"*/}
            {/*      strokeLinecap="round"*/}
            {/*      strokeLinejoin="round"></path>*/}
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
