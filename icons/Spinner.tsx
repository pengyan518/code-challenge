import React from 'react'
import config from '../config'

const Spinner: React.FC = props => (
  <svg xmlns={config.xlmns} fill="currentColor" {...props}>
    {/*  @ts-ignore */}
    <path
      style={{transform: 'matrix(1, 0, 0, 1, 0, 0)', animationPlayState: 'paused'}}
      d="M10 50A40 40 0 0 0 90 50A40 43.5 0 0 1 10 50"
      stroke="none"
      transform="matrix(1,0,0,1,0,0)"
    />
  </svg>
)

export default Spinner
