import React, {useEffect, useImperativeHandle, useMemo, useRef} from 'react'
// eslint-disable-next-line import/no-cycle
import SwipeItem from './SwipeItem'
import SwipeDots from './SwipeDots'
import useRect from '../hooks/Swipe/useRect'
import useSwipe from '../hooks/Swipe/useSwipe'
import useVisibility from '../hooks/Swipe/useVisibility'
import useEventListener from '../hooks/Swipe/useEventListener'
import useTouch from '../hooks/Swipe/useTouch'
import useResize from '../hooks/Swipe/useResize'

import {ChevronLeft, ChevronRight} from '../icons'
import {useMainContext} from '../contexts/MainContext'

export interface SwipeRef {
  next: () => void
  prev: () => void
  slideTo: (to: number, swiping?: boolean) => void
}

export interface SwipeProps {
  onSlideChange?: (current: number) => void
  autoplay?: number
  duration?: number
  initialSwipe?: number
  loop?: boolean
  showIndicators?: boolean
  vertical?: boolean
  touchable?: boolean
  style?: React.CSSProperties
  children: React.ReactNode
  groupLength?: number
}

const Swipe = React.forwardRef<SwipeRef, SwipeProps>((props, ref) => {
  const {
    initialSwipe = 0,
    vertical = false,
    duration = 400,
    autoplay = 3000,
    touchable = true,
    loop = true,
    onSlideChange,
    groupLength = window.innerWidth >= 1024 ? 5 : window.innerWidth < 768 ? 2 : 3,
    showIndicators = true,
  } = props
  const timer = useRef<NodeJS.Timeout | null>(null)
  const touch = useTouch()
  const count = useMemo(() => React.Children.count(props.children), [props.children])
  const {size, root, changeSize} = useRect<HTMLDivElement>([count])
  const itemSize = useMemo(() => (vertical ? 140 : size.width / groupLength), [groupLength, size.width, vertical])
  const itemKey = useMemo(() => (vertical ? 'height' : 'width'), [vertical])
  const gridTemplateKey = useMemo(() => (vertical ? 'grid-template-rows' : 'grid-template-columns'), [vertical])
  const {
    setCurrentIndex,
    setSwipeGroupLength,
    setSwipeCount,
    goToTargetPage,
    setGoToTargetPage,
    targetPage,
    searchResultInStore,
    setSearchResultInStore,
  } = useMainContext()

  // core
  const {setRefs, slideTo, next, prev, current, rawCurrent, swipeRef, loopMove, activatedNext, activatedPrev, goToPosition} = useSwipe({
    count,
    vertical,
    duration,
    size: itemSize,
    loop,
    groupLength,
  })

  const wrapperStyle = useMemo(
    () => ({
      [itemKey]: itemSize * count,
      [gridTemplateKey]: `repeat(${count}, minmax(0, ${itemSize}px))`,
    }),
    [itemKey, itemSize, count, gridTemplateKey]
  )

  const onPlay = () => {
    if (count <= 1) return
    if (!autoplay) return
    timer.current = setTimeout(() => {
      loopMove()
    }, autoplay)
  }

  const onPause = () => {
    timer.current && clearTimeout(timer.current)
    timer.current = null
  }

  const onTouchStart = (event: React.TouchEvent | TouchEvent) => {
    if (!touchable) return
    onPause()
    touch.start(event)
  }

  const onTouchMove = (event: React.TouchEvent | TouchEvent) => {
    if (!touchable) return
    touch.move(event)
    const {deltaX, deltaY} = touch.getDelta()
    slideTo({swiping: true, offset: vertical ? deltaY : deltaX})
  }

  const onTouchEnd = () => {
    if (!touchable) return
    const {deltaX, time, deltaY} = touch.end()
    const delta = vertical ? deltaY : deltaX
    const step = itemSize / 2 < Math.abs(delta) || Math.abs(delta / time) > 0.25 ? (delta > 0 ? -1 : 1) : 0
    slideTo({swiping: false, step})
    onPlay()
  }
  useEffect(() => {
    setCurrentIndex(current)
    setSwipeCount(count)
    setSwipeGroupLength(groupLength)
    // setGoToPositionFn(goToPosition)
  }, [count, current, goToPosition, groupLength, setCurrentIndex, setSwipeCount, setSwipeGroupLength])

  useEffect(() => {
    if (itemSize) {
      slideTo({step: initialSwipe - current, swiping: true})
    }
  }, [itemSize, initialSwipe])

  useEffect(() => {
    if (itemSize) {
      onPlay()
    }
    return () => {
      onPause()
    }
  }, [count, autoplay, current, itemSize])

  useEffect(() => {
    onSlideChange && onSlideChange(current)
  }, [current])

  const hidden = useVisibility()
  useEffect(() => {
    hidden ? onPause() : onPlay()
  }, [hidden])

  useEventListener(
    'touchmove',
    event => {
      if (vertical) {
        event.preventDefault()
      }
    },
    {passive: false, target: swipeRef.current}
  )

  useResize(() => {
    onPause()
    changeSize()
    onPlay()
  })

  useImperativeHandle(ref, () => {
    return {
      next() {
        onPause()
        next()
        onPlay()
      },
      prev() {
        onPause()
        prev()
        onPlay()
      },
      slideTo(to: number, swiping?: boolean) {
        onPause()
        slideTo({step: to - current, swiping})
        onPlay()
      },
    }
  })

  useEffect(() => {
    if (goToTargetPage && !searchResultInStore) {
      goToPosition({position: (Math.ceil((count + 1) / groupLength) - 1) * groupLength, countExtra: true})
      setGoToTargetPage(false)
    }
    return () => {
      setGoToTargetPage(false)
    }
  }, [count, goToPosition, goToTargetPage, groupLength, searchResultInStore, setGoToTargetPage])

  useEffect(() => {
    if (searchResultInStore) {
      // const position = targetPage % groupLength === 0 ? targetPage: Math.max(Math.floor((targetPage + 1) / groupLength) - 1, 0) * groupLength
      const position = targetPage % groupLength === 0 ? targetPage: Math.max(Math.ceil((targetPage + 1) / groupLength) - 1, 0) * groupLength
      goToPosition({position})
      // console.debug(`position: ${position} targetPage: ${targetPage}`)
      setSearchResultInStore(false)
    }
    return () => {
      setSearchResultInStore(false)
    }
  }, [count, goToPosition, goToTargetPage, groupLength, searchResultInStore, setGoToTargetPage, setSearchResultInStore, targetPage])

  return (
    <div className="relative w-full">
      <button
        className={`absolute w-12 left-0 z-10 h-5/6 hidden md:flex items-center ${activatedPrev() ? '' : 'swipe__nav--inactive'}`}
        onClick={prev}>
        {/*  @ts-ignore */}
        <ChevronLeft className="h-9 w-9 text-sky-600 ml-2 mt-1" viewBox="0 0 16 16" />
      </button>
      <button
        className={`absolute w-12 right-0 z-10 h-5/6 hidden md:flex items-center ${activatedNext() ? '' : 'swipe__nav--inactive'}`}
        onClick={next}>
        {/*  @ts-ignore */}
        <ChevronRight className="h-9 w-9 text-sky-600 mt-1" viewBox="0 0 16 16" />
      </button>

      <div
        ref={root}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchEnd}
        onTouchEnd={onTouchEnd}
        style={props.style}
        className="mx-auto relative overflow-hidden ml-4 mr-0 md:ml-14 md:mr-12 my-4 w-full">
         {/*  @ts-ignore */}
        <div ref={swipeRef} style={wrapperStyle} count={count} className="grid gap-4 md:gap-6 2xl:gap-8">
          {React.Children.map(props.children, (child, index) => {
            if (!React.isValidElement(child)) return null
            if (child.type !== SwipeItem) return null
            return React.cloneElement(child, {
              // @ts-ignore
              vertical,
              ref: setRefs(index),
            })
          })}
        </div>
        {showIndicators && (
          <SwipeDots current={current} vertical={vertical} count={count} groupLength={groupLength} goToPosition={goToPosition} />
        )}
      </div>
    </div>
  )
})

export default Swipe

Swipe.displayName = 'Swipe'
