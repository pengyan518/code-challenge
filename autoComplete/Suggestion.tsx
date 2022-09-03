import React, {memo, FC} from 'react'

import SuggestionItem from './SuggestionItem'

interface IProps {
  suggestions?: any[]
}

const Suggestion: FC<IProps> = memo(({suggestions}) => {
  return (
    <div className="DocSearch-Dropdown">
      <div className="DocSearch-Dropdown-Container">
        <section className="DocSearch-Hits">
          <div className="DocSearch-Hit-source"/>
          <ul role="listbox" aria-labelledby="docsearch-label" id="docsearch-list">
            {suggestions && suggestions.map((item, inx) => <SuggestionItem key={inx} item={item} />)}
          </ul>
        </section>
        <section className="DocSearch-HitsFooter"></section>
      </div>
    </div>
  )
})

Suggestion.displayName = 'Suggestion'
export default Suggestion
