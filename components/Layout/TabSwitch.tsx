import React, {ReactNode, useCallback} from 'react'

type TabSwitchProps = {
  children?: ReactNode
  activeTab: string
  setTabActive: any
}

type IProps = {
  text: string
  newProp?: any
  myClassName?: any
  label: string
}

const ButtonContainer = (props: TabSwitchProps) => {
  const newProp = {
    textColor: '#ffffff',
  }

  const myClassName = (child: {props: {label: any}}) => {
    return `taeb ${props.activeTab === child.props.label ? 'active' : ''}`
  }

  const activeTabOnClick = useCallback(
    (e: {target: {getAttribute: (arg: string) => any}}) => props.setTabActive(e.target.getAttribute('label')),
    [props]
  )

  return (
    <div className={`taeb-switch text-center ${props.activeTab}`}>
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement(child as React.ReactElement<any>, {newProp, myClassName: myClassName(child), onClick: activeTabOnClick})
      })}
    </div>
  )
}

const TabItem = ({text, ...props}: IProps) => {
  return (
    <a
      {...props}
      style={{
        color: props.newProp.textColor,
      }}
      className={props.myClassName}>
      {text}
    </a>
  )
}

const TabSwitch = (props: TabSwitchProps) => {
  return (
    <div className="taeb-switch__wrapper">
      <ButtonContainer activeTab={props.activeTab} setTabActive={props.setTabActive}>
        <TabItem text="Hourly" label="left" />
        <TabItem text="Daily" label="right" />
      </ButtonContainer>
    </div>
  )
}

export {TabSwitch}
