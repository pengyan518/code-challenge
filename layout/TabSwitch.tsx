import {ReactNode, useCallback} from 'react'
import config from '../config'

type TabSwitchProps = {
  children?: ReactNode
  activeTab: string
  setTabActive: any
}

const TabSwitch = (props: TabSwitchProps) => {
  const activeTabOnClick = useCallback(
    (e: {target: {getAttribute: (arg0: string) => any}}) => props.setTabActive(e.target.getAttribute('label')),
    [props]
  )
  return (
    <div className="taeb-switch__wrapper">
      <div className={`taeb-switch text-center ${props.activeTab}`}>
        <a className={`taeb ${props.activeTab === 'left' && 'active'}`} onClick={activeTabOnClick} label="left">
          Hourly
        </a>
        <a className={`taeb ${props.activeTab === 'right' && 'active'}`} onClick={activeTabOnClick} label="right">
          Daily
        </a>
      </div>
    </div>
  )
}

export {TabSwitch}
