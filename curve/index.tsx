import React, {useMemo, useState, useRef, useEffect, useCallback} from 'react'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

// @ts-ignore
const Curve: React.FC = props => {
  const {hoursDetail} = useMainContext()

  const points = useRef([])
  points.current = hoursDetail.hour
    .filter((hour: any, index: number) => index < 12)
    .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any}, index) => {
      const {temp_f} = oneHour
      return `${index*20},${temp_f}`
    })
  // @ts-ignore
  return (
    <>
      {/* @ts-ignore */}
      <svg xmlns={config.xlmns} fill="currentColor" width={600} height={200} {...props}>
        {/* @ts-ignore */}
        <g>
          {/* @ts-ignore */}
          <polygon points={points.current} fill="red" />
            {/* @ts-ignore */}
        </g>
          {/* @ts-ignore */}
      </svg>
    </>
  )
}

export default Curve
