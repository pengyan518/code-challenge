import React, {useMemo, useState, useRef, useEffect, useCallback} from 'react'
import config from '../config'
import {useMainContext} from '../contexts/MainContext'

interface Iprops {
  itemWidth?: number
  itemHeight?: number
  curve?: any
}

// @ts-ignore
const Curve: React.FC<Iprops> = props => {
  const {itemWidth = 100, itemHeight = 150, curve} = props

  const points = useRef(null)

  // @ts-ignore
  points.current = [`${itemWidth / 2},${itemHeight}`, ...curve, `${(curve.length - 1) * itemWidth + itemWidth / 2},${itemHeight}`]
  // @ts-ignore
  return (
    <div className="curve__wrapper absolute bottom-0 left-0 z-0">
      {/* @ts-ignore */}
      <svg
        xmlns={config.xlmns}
        fill="currentColor"
        width={curve.length * itemWidth}
        height={itemHeight}
        viewBox={`0 0 ${curve.length * itemWidth} ${itemHeight}`}>
        {/* @ts-ignore */}
        <g>
          <polyline points={curve.join(' ')} stroke="#0a84ff" strokeWidth="2" fill="none" />
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
