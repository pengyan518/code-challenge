import {Current} from '../Current/Current'
import {Header} from './Header'

const MainHome = () => {
  return (
    <main className="mainHome__body main mx-auto">
      <h1>welcome to next.js!</h1>
      <Header />
      <Current />
    </main>
  )
}

export {MainHome}
