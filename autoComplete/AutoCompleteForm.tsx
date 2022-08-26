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

  const onTextChanged = useCallback(
    async (value: string) => {
      if (value.length > 0) {
        const response = await axios.get(`${config.search}${value}`)
        setSuggestions(response.data)
        setShowSuggestion(true)
      }
    },
    [setShowSuggestion]
  )

  const changeHandler = useCallback(
    (event: {target: {value: React.SetStateAction<string>}}) => {
      const target = event.target
      setQuery(target.value)
      onTextChanged(target.value)
    },
    [onTextChanged]
  )

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])


  return (
    <>
      <form className="j-center d-f">
        <input
          id="search-form"
          className="w-full"
          onChange={debouncedChangeHandler}
          placeholder="Search by city or state"
          type="text"
        />
      </form>
      {query !== '' && suggestions.length > 0 && showSuggestion && <Suggestion suggestions={suggestions} />}
      <div>{suggestions.length === 0 && query !== '' && 'No matches...'}</div>
    </>
  )
})

AutoCompleteForm.displayName = 'AutoCompleteForm'
export default AutoCompleteForm
