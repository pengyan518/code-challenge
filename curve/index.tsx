import React, {useMemo, useState, useRef, useEffect, useCallback} from 'react'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

// @ts-ignore
const Curve: React.FC = props => {
  const {hoursDetail} = useMainContext()
  const itemWidth = 100
  const itemHeight = 150

  const points = useRef([])
  const curve = hoursDetail.hour
    .filter((hour: any, index: number) => index < 12)
    .map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any}, index: number) => {
      const {temp_f} = oneHour
      return `${index * itemWidth},${itemHeight - temp_f}`
    })
  
  // @ts-ignore
  points.current = [`0,${itemHeight}`, ...curve, `${ (curve.length - 1)* itemWidth},${itemHeight}`]
  // @ts-ignore
  return (
    <>
      {/* @ts-ignore */}
      <svg
        xmlns={config.xlmns}
        fill="currentColor"
        width={curve.length * itemWidth}
        height={itemHeight}
        viewBox={`0 0 ${curve.length * itemWidth} ${itemHeight}`}
        {...props}>
        {/* @ts-ignore */}
        <g>
          {/* @ts-ignore */}
          <polygon points={points.current.join(' ')} fill="red" />
          {/* @ts-ignore */}
        </g>
        {/* @ts-ignore */}
      </svg>
    </>
  )
}

export default Curve
