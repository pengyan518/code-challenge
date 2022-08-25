import React, {useState, memo, useCallback, useMemo, useEffect, useRef} from 'react'
// import axios from 'axios'
// import debounce from 'lodash.debounce'


import SuggestionItem from './SuggestionItem'
// import debounce from '../../utils/debouncer'

const renderHighLight = (highLight, term) =>
  String(highLight).replace(new RegExp(term, 'gi'), `<span class="autoComplete_highlighted">$&</span>`)

export default memo(({suggestions, query}) => {

  return (
    <>
      <ul id="autoComplete_list_popup" aria-label="Search" className="autoComplete_list" role="listbox" tabIndex="-1">
        {suggestions.map((item, inx) => {
          const {name} = item

          return (
            <SuggestionItem key={inx} name={name} />
          )
        })}
      </ul>
    </>
  )
})
