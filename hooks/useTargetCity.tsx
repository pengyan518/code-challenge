import React, {memo, useCallback, FC} from 'react'
import Link from 'next/link'
import {useFetchCity} from './useFetchCity'
import {useMainContext} from '../contexts/MainContext'

type SuggestionItemProps = {
  item: {
    name?: string
    fromSearchBox?: boolean
  }
}
const useTargetCity = ({item = {fromSearchBox: true}}: SuggestionItemProps) => {
  const {
    swipeCount,
    setLimit,
    setHoursDetail,
    setFuture,
    setLocation,
    setFutureInfo,
    swipeGroupLength,
    setSearchResultInStore,
    setGoToTargetPage,
  } = useMainContext()
  const {fetchInitial, forecastday} = useFetchCity()

  const showHours = useCallback(
    (hour: any, date: any) => {
      // setDetailPage(true)
      setFuture(true)
      setHoursDetail({
        city: item.name,
        hour,
        date,
      })
    },
    [item.name, setFuture, setHoursDetail]
  )

  const fetchDetails = useCallback(
    (oneDay: any) => {
      const currentCity: {location: {}; current: {}} = forecastday.filter((city: {city: string}) => city.city === item.name)[0]
      setLocation(currentCity.location)
      setFutureInfo(oneDay)
    },
    [forecastday, item.name, setFutureInfo, setLocation]
  )

  const handleTargetCityAction = useCallback(() => {
    const feeds = forecastday.map(v => v.city)
    if (feeds.includes(item.name)) {
      const cityIndex = feeds.indexOf(item.name)
      showHours(forecastday[cityIndex].days[0].hour, forecastday[cityIndex].days[0].date)
      fetchDetails(forecastday[cityIndex].days[0])
      if (item.fromSearchBox) {
        setSearchResultInStore(true)
        setGoToTargetPage(true)
      }
    } else if (swipeCount <= 20) {
      // setDetailPage(true)
      if (item.name != null) {
        fetchInitial(item.name)
      }

      if (item.fromSearchBox && swipeCount >= swipeGroupLength) {
        setGoToTargetPage(true)
      }
    } else {
      if (item.fromSearchBox) {
        setLimit(true)
        alert('Up to 20 Cities!')
      }
    }
  }, [fetchDetails, fetchInitial, forecastday, item.fromSearchBox, item.name, setGoToTargetPage, setLimit, setSearchResultInStore, showHours, swipeCount, swipeGroupLength])

  return {handleTargetCityAction}
}

export default useTargetCity
