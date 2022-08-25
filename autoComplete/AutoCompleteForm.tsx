import React, {useState, memo, useCallback, useMemo, useEffect} from 'react'
import axios from 'axios'

import config, {prefix} from '../config'
import Suggestion from './Suggestion'
import debounce from '../utils/debounce'
import {useMainContext} from '../contexts/MainContext'

const AutoCompleteForm = memo(() => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const {showSuggestion, setShowSuggestion} = useMainContext()

  const onTextChanged = async value => {
    if (value.length > 0) {
      const response = await axios.get(`${config.search}${value}`)
      setSuggestions(response.data)
      setShowSuggestion(true)
    }
  }

  const changeHandler = useCallback((event: {target: {value: React.SetStateAction<string>}}) => {
    setQuery(event.target.value)
    onTextChanged(event.target.value)
  }, [])

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])

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
      {query !== '' && suggestions.length > 0 && showSuggestion && <Suggestion suggestions={suggestions} query={query} />}
      <div>{suggestions.length === 0 && query !== '' && 'No matches...'}</div>
    </>
  )
})

AutoCompleteForm.displayName = 'AutoCompleteForm'
export default AutoCompleteForm
