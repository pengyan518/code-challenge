import React, {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'
import useRefs from '../../hooks/useRefs'

interface HourItemRef {
  top: number
}

interface HoursWrapperProps {
  children?: ReactNode
}

const TwelveHoursWrapper = (props: HoursWrapperProps) => {
  const currentTime = useRef(new Date().getHours())

  const [refs, setRefs] = useRefs<HourItemRef>()

  useEffect(() => {
    if (refs.length > 0) {
      setTimeout(() => window.scrollTo(0, refs[currentTime.current].top), 200)
    }
  }, [refs])

  const items = React.Children.map(props.children, (child: any, index) => {
    return React.cloneElement(child as React.ReactElement<any>, {ref: setRefs(index)})
  })

  return <div>{items}</div>
}

export {TwelveHoursWrapper}
