import React, {memo, FC} from 'react'

import SuggestionItem from './SuggestionItem'

interface IProps {
  suggestions?: any[]
  query?: string
}

const Suggestion: FC<IProps> = memo(({suggestions, query}) => {
  return (
    <ul aria-label="Search" className="autoComplete_list ps-a" role="listbox">
      {suggestions && suggestions.map((item, inx) => (
        <SuggestionItem key={inx} name={item.name} />
      ))}
    </ul>
  )
})

Suggestion.displayName = 'Suggestion'
export default Suggestion
