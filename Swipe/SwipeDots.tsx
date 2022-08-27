import React from 'react'

interface SwipeDotsProps {
  current: number
  count: number
  groupLength: number
  vertical: boolean
  goToPosition: (p: {position: number}) => void
}

const SwipeDots: React.FC<SwipeDotsProps> = props => {
  const {current, vertical, count, groupLength, goToPosition} = props

  if (count <= groupLength) {
    return null
  }

  return (
    <div className={vertical ? 'swipe__dots--vertical' : 'swipe__dots'}>
      {new Array(Math.ceil(count / groupLength)).fill(1).map((_, index) => (
        <div
          onClick={goToPosition({position: index * groupLength, disabled: Math.ceil(current / groupLength) === index})}
          className={`${Math.ceil(current / groupLength) === index ? 'swipe__dot swipe__dot--active' : 'swipe__dot'}`}
          key={index}
        />
      ))}
    </div>
  )
}

export default SwipeDots
