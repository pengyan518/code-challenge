import React, {useState, memo, useCallback, useMemo, useEffect} from 'react'
import axios from 'axios'

import config, {prefix} from '../../config'
import Suggestion from './Suggestion'
import debounce from '../../utils/debounce'
import {useMainContext} from '../../contexts/MainContext'

const AutoCompleteForm = memo(() => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const {showSuggestion, setShowSuggestion, setShowSearchPopup} = useMainContext()

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

  const handleClose = useCallback(() => {
    setShowSearchPopup(false)
  }, [setShowSearchPopup])

  const changeHandler = useCallback(
    (event: {target: {value: string}}) => {
      const target = event.target
      setQuery(target.value)
      onTextChanged(target.value)
    },
    [onTextChanged]
  )

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])

  return (
    <>
      <header className="DocSearch-SearchBar">
        <form className="DocSearch-Form">
          <label className="DocSearch-MagnifierLabel" htmlFor="docsearch-input" id="docsearch-label">
            <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
              <path
                d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>
          </label>
          <div className="DocSearch-LoadingIndicator">
            <svg viewBox="0 0 38 38" stroke="currentColor" strokeOpacity=".5">
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".3" cx="18" cy="18" r="18"></circle>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"></animateTransform>
                  </path>
                </g>
              </g>
            </svg>
          </div>
          <input
            id="search-form"
            className="DocSearch-Input"
            aria-autocomplete="both"
            onChange={debouncedChangeHandler}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            autoFocus
            placeholder="Add City or ZIP code"
            maxLength={64}
            type="search"
          />
          <button type="reset" title="Clear the query" className="DocSearch-Reset" aria-label="Clear the query">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>
          </button>
        </form>
        <button className="DocSearch-Cancel" type="reset" aria-label="Cancel" onClick={handleClose}>
          Cancel
        </button>
      </header>

      {query !== '' && suggestions.length > 0 && showSuggestion && <Suggestion suggestions={suggestions} />}
      {suggestions.length === 0 && query !== '' && (
        <div className="DocSearch-Dropdown">
          <div className="DocSearch-StartScreen">
            <p className="DocSearch-Help">No matches...</p>
          </div>
        </div>
      )}
    </>
  )
})

AutoCompleteForm.displayName = 'AutoCompleteForm'
export default AutoCompleteForm
