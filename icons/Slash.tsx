import React from 'react'
import config from '../config'

const Slash: React.FC = props => (
  <svg xmlns={config.xlmns} fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
  </svg>
)

export default Slash
