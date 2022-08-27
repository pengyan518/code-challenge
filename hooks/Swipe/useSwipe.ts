import {useRef, useState, useMemo, useEffect} from 'react'
// import {SwipeItemRef} from '../SwipeItem'
import useRefs from './useRefs'

type SwipeParams = {
  count: number
  vertical: boolean
  duration: number
  size: number
  loop: boolean
  groupLength: number
}

type SlideToParams = Partial<{
  step: number
  swiping: boolean
  offset: number
}>

interface SwipeItemRef {
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

const useSwipe = (options: SwipeParams) => {
  const {count, vertical, duration, size, loop, groupLength} = options
  const [current, setCurrent] = useState(0)
  const realCurrent = useMemo(() => (current + count) % count || 0, [current, count])
  const swipeRef = useRef<HTMLDivElement>(null)
  const [refs, setRefs] = useRefs<SwipeItemRef>()
  const minCurrent = useMemo(() => (loop ? -groupLength : 0), [groupLength, loop])
  const maxCurrent = useMemo(() => (loop ? count : count - groupLength), [loop, count, groupLength])
  const loopDirection = useRef(1)

  useEffect(() => {
    if (realCurrent === 0) {
      loopDirection.current = 1
    }
    if (realCurrent === count - groupLength) {
      loopDirection.current = -1
    }
  }, [realCurrent])

  const setStyle = (dom: HTMLDivElement | null, opt: {swiping: boolean; offset: number}) => {
    if (!dom) return
    const {swiping, offset} = opt
    dom.style.transition = `all ${swiping ? 0.25 : duration}ms`
    dom.style.transform = `translate${vertical ? 'Y' : 'X'}(${offset}px)`
  }

  const resetCurrent = () => {
    setStyle(swipeRef.current, {
      swiping: true,
      offset: -realCurrent * size,
    })
  }


  const slideTo = ({step = 0, swiping = false, offset = 0}: SlideToParams) => {
    if (count <= 1) return

    let direction = ''
    if (step < 0 || offset > 0) {
      direction = 'left'
    }
    if (step > 0 || offset < 0) {
      direction = 'right'
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // loop && resetChild(step, offset)
    const futureCurrent = Math.min(Math.max(realCurrent + step, minCurrent), maxCurrent)
    let futureOffset = -futureCurrent * size + offset
    if ([-groupLength, count - groupLength].includes(current) && direction === 'right') {
      futureOffset = 0
      setStyle(swipeRef.current, {
        swiping: true,
        offset: futureOffset,
      })
    } else if ([count, 0].includes(current) && direction === 'left') {
      futureOffset = -(count - groupLength) * size
      setStyle(swipeRef.current, {
        swiping: true,
        offset: futureOffset,
      })
    } else if (swiping) {
      setStyle(swipeRef.current, {
        swiping,
        offset: futureOffset,
      })
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStyle(swipeRef.current, {
            swiping,
            offset: futureOffset,
          })
        })
      })
    }

    console.debug(futureCurrent)
    setCurrent(futureCurrent)
  }

  const next = () => {
    resetCurrent()
    slideTo({step: groupLength})
  }

  const prev = () => {
    resetCurrent()
    slideTo({step: -groupLength})
  }

  const loopMove = () => {
    if (loop) {
      next()
      return
    }
    if (loopDirection.current === 1) {
      next()
    } else {
      prev()
    }
  }

  return {
    swipeRef,
    setRefs,
    current: realCurrent,
    slideTo,
    next,
    prev,
    loopMove,
  }
}

export default useSwipe
