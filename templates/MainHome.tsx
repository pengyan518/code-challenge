import styles from '../styles/Home.module.css'
import {Daily} from '../dashboard/Daily'
import {MainContext, useMainContext} from '../contexts/MainContext'
import {Search} from '../dashboard/Search'
import {Hourly} from '../dashboard/Hourly'

const MainHome = () => {
  const {detailPage, setDetailPage} = useMainContext()
  return (
    <main className={styles.main}>
      <Search />
      {detailPage ? <Hourly /> : <Daily />}
    </main>
  )
}

export default MainHome
