import React, {memo, FC} from 'react'

import SuggestionItem from './SuggestionItem'

interface IProps {
  suggestions?: any[]
}

const Suggestion: FC<IProps> = memo(({suggestions}) => {
  return (
    <ul aria-label="Search" className="autoComplete_list absolute" role="listbox">
      {suggestions && suggestions.map((item, inx) => (
        <SuggestionItem key={inx} name={item.name} />
      ))}
    </ul>
  )
})

Suggestion.displayName = 'Suggestion'
export default Suggestion
