import React, {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'

type HoursWrapperProps = {
  children?: ReactNode
}

const HoursBox = (props: HoursWrapperProps, ref: React.Ref<unknown> | undefined) => {
  const currentTime = useRef(new Date().getHours())
  const hoursRef = useRef<any>(null)

  const newClassName = (child: {props: {index: number}}) => {
    if (child.props.index > currentTime.current) {
      return 'hour-item text-center active'
    }
    return 'hour-item text-center'
  }

  const transformStyle = useMemo(() => ({transform: `translateX(${-currentTime.current * 100}px)`}), [])

  useImperativeHandle(
    ref,
    () => ({
      transformStyle,
      currentTime: currentTime.current
    }),
    [transformStyle]
  )

  return (
    <div className="hours-grid grid relative z-10" ref={hoursRef}>
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement(child as React.ReactElement<any>, {myClassName: newClassName(child)})
      })}
    </div>
  )
}

const HoursWrapper = forwardRef(HoursBox)

export {HoursWrapper}
