import {Current} from '../current/Current'
import {Header} from './Header'

const MainHome = () => {
  return (
    <main className="mainHome__body main mx-auto">
      <Header />
      <Current />
    </main>
  )
}

export {MainHome}
