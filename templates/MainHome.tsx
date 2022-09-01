import {Dashboard} from '../dashboard/Dashboard'
import {useMainContext} from '../contexts/MainContext'
import {Search} from '../search/Search'
import {Current} from '../current/Current'

const MainHome = () => {
  const {detailPage} = useMainContext()
  return (
    <main className="main mx-auto">
      <Search />
      {detailPage ? <Current /> : <Dashboard />}
    </main>
  )
}

export {MainHome}
