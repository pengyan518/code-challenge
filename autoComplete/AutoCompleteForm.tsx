import React, {useState, memo, useCallback, useMemo, useEffect} from 'react'
import axios from 'axios'

// import {useActionsCity, useCityData} from '../../features/getCityData'
// import {useFrameActions, usePopupLocateCityActions} from '../../features/getModal'

import config, {prefix} from '../config'
import Suggestion from './Suggestion'
import debounce from '../utils/debounce'
// import debounce from '../../utils/debouncer'

export default memo(() => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  // if (query !== '') {
  //   filteredNames = fakeNames.filter(name => name.toLowerCase().includes(query.toLowerCase()))
  // }

  const onTextChanged = async value => {
    // const {value} = e.target
    // let suggestions = []
    if (value.length > 0) {
      const response = await axios.get(`${config.search}${value}`)
      await setSuggestions(response.data)
    }
  }

  const changeHandler = (event: {target: {value: React.SetStateAction<string>}}) => {
    setQuery(event.target.value)
    onTextChanged(event.target.value)
  }
  // const onChangeFn = (e)=> {debounce(() => {onTextChanged(e)}, 400)}

  // https://dmitripavlutin.com/react-throttle-debounce/
  // const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), [])
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  // useEffect(
  //   () => () => {
  //     debouncedChangeHandler.cancel()
  //   },
  //   [debouncedChangeHandler]
  // )

  return (
    <>
      <div className="j-center d-f">
        <input
          id="TypeToSearch--LocateCity"
          className="w100"
          onChange={debouncedChangeHandler}
          placeholder="Search by city or state"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-autocomplete="both"
          aria-haspopup="false"
        />
      </div>
      {query !== '' && suggestions.length > 0 && <Suggestion suggestions={suggestions} query={query} />}
      <div>{suggestions.length === 0 && query !== '' && 'No matches...'}</div>
    </>
  )
})
