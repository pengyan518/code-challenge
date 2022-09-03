import {Dashboard} from '../dashboard/Dashboard'
import {useMainContext} from '../contexts/MainContext'
import {Current} from '../current/Current'
import {Header} from './Header'

const MainHome = () => {
  const {detailPage} = useMainContext()
  return (
    <main className="main mx-auto">
      <Header />
      {detailPage ? <Current /> : <Dashboard />}
    </main>
  )
}

export {MainHome}
