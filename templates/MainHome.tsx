import styles from '../styles/Home.module.css'
import {Dashboard} from '../dashboard/Dashboard'
import {MainContext, useMainContext} from '../contexts/MainContext'
import {Search} from '../search/Search'
import {Current} from '../current/Current'

const MainHome = () => {
  const {detailPage, setDetailPage} = useMainContext()
  return (
    <main className={styles.main}>
      <Search />
      {detailPage ? <Current /> : <Dashboard />}
    </main>
  )
}

export default MainHome
