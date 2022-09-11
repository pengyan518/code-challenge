import React, {useMemo, useState, useRef, useEffect, useCallback} from 'react'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

// @ts-ignore
const Curve: React.FC = props => {
  const {hoursDetail} = useMainContext()
  const itemWidth = 100
  const itemHeight = 150

  const points = useRef([])
  const baseHeight = 20
  const hours = hoursDetail.hour.filter((hour: any, index: number) => index < 12)
  const curve = hours.map((oneHour: {condition: any; temp_f: any; time_epoch: any; time: any}, index: number) => {
    const {temp_f} = oneHour
    return `${index * itemWidth + itemWidth / 2},${itemHeight - temp_f - baseHeight}`
  })

  // @ts-ignore
  points.current = [
    `0,${itemHeight}`,
    `0,${itemHeight - hours[0].temp_f - baseHeight}`,
    ...curve,
    `${(curve.length) * itemWidth},${itemHeight - hours[curve.length - 1].temp_f - baseHeight}`,
    `${(curve.length) * itemWidth},${itemHeight}`,
  ]
  // @ts-ignore
  return (
    <div className="curve__wrapper absolute bottom-0 left-0 z-0">
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
          <polyline points={curve.join(' ')} stroke="#0a84ff" strokeWidth="2" fill="none"/>
          {/* @ts-ignore */}
          <polygon points={points.current.join(' ')} fill="#313542" />
          {/* @ts-ignore */}
        </g>
        {/* @ts-ignore */}
      </svg>
    </div>
  )
}

export default Curve
