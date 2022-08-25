import React, {useState, memo, useCallback, useMemo, useEffect, useRef} from 'react'
import {useMainContext} from '../contexts/MainContext'
import {useFetchCity} from "../hooks/useFetchCity";

// import compareDateFromNow from '../../utils/compareTime'
// import debounce from '../../utils/debouncer'

export default memo(({name}) => {
  // const [date, setDate] = useState('')
  // const {getSingleCity} = useActionsCity()
  // const {openFrame} = useFrameActions()
  // const {openPopupLocateCity} = usePopupLocateCityActions()
  // const divRef = useRef(null)
  const {city, setCurrentCity, fetchInitial} = useFetchCity()
  const getCityData = useCallback(() => {
    setCurrentCity(name)
    console.log(name)
    fetchInitial(name)
  }, [fetchInitial, name, setCurrentCity])
  // const getDate = useCallback(
  //   async loginLangCode => {
  //   const myDate = await getDateRangeFormat(start, end, loginLangCode)
  //   await console.debug(myDate)
  //   return setDate(myDate)
  // }, [end, start])
  //
  // useEffect(() => {
  //   if (date === '') {
  //     getDate(langs.loginLangCode)
  //   }
  // }, [date, getDate, langs.loginLangCode])

  return (
    <li role="option">
      {/*<div className="AutocompleteItem__Label a-left open-sans-c fw600">Shen Yun Performances</div>*/}
      <a role="button" tabIndex={0} onClick={getCityData}>
        <div className="AutocompleteItem__Inner">
          <div className="AutocompleteItem_Main open-sans-c">
            <div className="AutocompleteItem__Theater fw600" dangerouslySetInnerHTML={{__html: name}} />
          </div>
        </div>
      </a>
    </li>
  )
})

// ItemCard.displayName = 'ItemCard'
