import React from 'react'
import config from '../../config'

const ChevronUp: React.FC = props => (
  <svg xmlns={config.xlmns} fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
  </svg>
)

export default ChevronUp
