import React, {useImperativeHandle, useMemo, useRef, useState} from 'react'
import {SwipeProps} from './Swipe'

export interface SwipeItemRef {
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

export interface SwipeItemProps {
  readonly vertical?: SwipeProps['vertical']
  readonly style?: React.CSSProperties
  children: React.ReactNode
}

const SwipeItem = React.forwardRef<SwipeItemRef, SwipeItemProps>((props, ref) => {
  const {children, style, vertical} = props
  const [offset, setOffset] = useState(0)
  const swipeItemRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => {
    return {
      setOffset,
    }
  })

  const itemStyle = useMemo(() => {
    return {
      transform: offset ? `translate${props.vertical ? 'Y' : 'X'}(${offset}px)` : '',
      ...style,
    }
  }, [offset, props.vertical, style])

  return (
    <div ref={swipeItemRef} className="" style={itemStyle}>
      {children}
    </div>
  )
})

export default SwipeItem
SwipeItem.displayName = 'SwipeItem'
