import {Dashboard} from '../dashboard/Dashboard'
import {useMainContext} from '../contexts/MainContext'
import {Current} from '../current/Current'
import {Header} from './Header'
import {TwelveHoursView} from '../twelve-hours-view/TwelveHoursView'

const MainHome = () => {
  const {detailPage, twelveHoursPage} = useMainContext()
  return (
    <main className="mainHome__body main mx-auto">
      <Header />
      {/*{detailPage ? <Current /> : <>{twelveHoursPage ? <TwelveHoursView /> : <Dashboard />}</>}*/}
      <Current />
    </main>
  )
}

export {MainHome}
