import React, {memo, FC} from 'react'

import SuggestionItem from './SuggestionItem'

interface IProps {
  suggestions?: any[]
}

const Suggestion: FC<IProps> = memo(({suggestions}) => {
  return (
    <div className="DocSearch-Dropdown">
      <div className="DocSearch-StartScreen">
        <ul aria-label="Search" className="autoComplete_list absolute" role="listbox">

        </ul>
      </div>

      <div className="DocSearch-Dropdown-Container">
        <section className="DocSearch-Hits">
          <div className="DocSearch-Hit-source">Migrating to v5</div>
          <ul role="listbox" aria-labelledby="docsearch-label" id="docsearch-list">
            {suggestions && suggestions.map((item, inx) => <SuggestionItem key={inx} name={item.name} />)}
            <li className="DocSearch-Hit" id="docsearch-item-2" role="option" aria-selected="true">
              <a href="/docs/5.2/migration/#additional-changes">
                <div className="DocSearch-Hit-Container">
                  <div className="DocSearch-Hit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path
                        d="M17 5H3h14zm0 5H3h14zm0 5H3h14z"
                        stroke="currentColor"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="DocSearch-Hit-content-wrapper">
                    <span className="DocSearch-Hit-title">
                      Introduced <mark>new</mark> $enable-container-classes option. — Now when opting into …
                    </span>
                    <span className="DocSearch-Hit-path">v5.2.0</span>
                  </div>
                  <div className="DocSearch-Hit-action">
                    <svg className="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20">
                      <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                        <path d="M8 17l-6-6 6-6"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </section>
        <section className="DocSearch-HitsFooter"></section>
      </div>
    </div>
  )
})

Suggestion.displayName = 'Suggestion'
export default Suggestion
